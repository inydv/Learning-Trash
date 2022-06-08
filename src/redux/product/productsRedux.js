import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    isFetching: false,
    error: false,
    productsCount: 0,
    resultPerPage: 0,
  },
  reducers: {
    ALL_PRODUCT_REQUEST: (state) => {
      state.isFetching = true;
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
    ALL_PRODUCT_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  clearError,
} = productsSlice.actions;
export default productsSlice.reducer;
