/* eslint-disable no-bitwise */
export const JWT_SECRET = "devias-top-secret-key";
export const JWT_EXPIRES_IN = 3600 * 24 * 2; // 2 days

// Since we create a fake signed token, we have to implement a fake jwt decode
// platform to simulate "jwt-decode" library.
export const decode = (token: string): any => {
  const [encodedHeader, encodedPayload] = token.split(".");

  // const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (payload.exp === undefined) {
    return 0;
  }
  if (now < payload.exp) {
    return 0;
  }

  return payload;
};

export const verify = (
  token: string,
  privateKey?: string
): Record<string, any> | any => {
  const [encodedHeader, encodedPayload] = token.split(".");
  // const header = JSON.parse(atob(encodedHeader));
  const payload = JSON.parse(atob(encodedPayload));
  const now = new Date();

  if (payload.exp === undefined) {
    return 0;
  }
  if (now < payload.exp) {
    return 0;
  }

  return payload;
};
