// TODOD: improve axios interceptors

import { decode } from "@/utils/jwt";

const axios = require("axios");

let isRefreshing = false;
export const setRefresh = (value: boolean) => {
  isRefreshing = value;
};
export let filedQuery: {
  resolve: (value: unknown) => void;
  reject: (reason?: any) => void;
}[] = [];

const processQueue = (error: any, token = null) => {
  filedQuery.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  filedQuery = [];
};

export const axiosInstance = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}`,
});

axiosInstance.interceptors.request.use(
  async (config: { headers: { [x: string]: any } }) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      return Promise.reject("No token");
    }
    return config;
  },
  (error: any) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (res: any) => res,
  (err: { config: any; response: { status: number; data: any } }) => {
    const originalRequest = err.config;

    // const token = localStorage.getItem('accessToken');
    if (err?.response?.status === 401) {
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          filedQuery.push({ resolve, reject });
        })
          .then(() => {
            originalRequest.headers.Authorization = `Bearer ${localStorage.getItem(
              "accessToken"
            )}`;
            return axios(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      const refreshToken = localStorage.getItem("refreshToken");
      if (refreshToken) {
        const decodedRefresh = decode(refreshToken) as any;
        if (decodedRefresh.account_id) {
          return new Promise((resolve, reject) => {
            axios({
              method: "post",
              url: `${process.env.NEXT_PUBLIC_API_URL}/api/v4/refresh_token`,
              headers: {
                "X-Refresh-Token": refreshToken,
              },
              data: {
                data: {
                  type: "user",
                  id: null,
                  attributes: {
                    account_id: decodedRefresh.account_id,
                  },
                },
              },
            })
              .then((data: any) => {
                localStorage.setItem("accessToken", data.data.accessToken);
                // localStorage.setItem('refreshToken', data.data.refresh)
                axiosInstance.defaults.headers.common.Authorization = `Bearer ${data.data.accessToken}`;
                originalRequest.headers.Authorization = `Bearer ${data.data.accessToken}`;
                processQueue(null, data.data.accessToken);
                resolve(axios(originalRequest));
              })
              .catch((err: any) => {
                processQueue(err, null);
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("accessToken");
                reject(err);
                window.location.reload();
              })
              .finally(() => {
                isRefreshing = false;
              });
          });
        }
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("accessToken");
        window.location.reload();
      }
    }

    return Promise.reject(err);
  }
);
