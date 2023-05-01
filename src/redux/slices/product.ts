// Example of a slice
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// utils
import { IProductState } from "@/types/product";
//
import { dispatch } from "../store";
import axios from "axios";

// ----------------------------------------------------------------------

const initialState: IProductState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
};

const slice = createSlice({
  name: "product",
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    },

    // GET PRODUCT
    getProductSuccess(state, action) {
      state.isLoading = false;
      state.product = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.error = "Error";
      });
  },
});

// Reducer
export default slice.reducer;

// Actions
export const { startLoading, hasError, getProductSuccess, getProductsSuccess } =
  slice.actions;

// ----------------------------------------------------------------------

export const getProducts = createAsyncThunk(
  "product/getProducts",
  async (filters: any, thunkApi) => {
    const response = await axios
      .get(`/api/products`, {
        params: filters,
      })
      .then((response: any) => {
        return response;
      })
      .catch((error: { response: { data: any } }) => {
        return thunkApi.rejectWithValue(
          error?.response.data.errors[0] || error
        );
      });

    if (response.status === 200) {
      return response.data;
    } else {
      return response;
    }
  }
);
