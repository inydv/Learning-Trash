import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    isFetching: false,
    error: false,
    productsCount: 0,
  },
  reducers: {
    fetchingStart: (state) => {
      state.isFetching = true;
    },
    fetchingOrder: (state, action) => {
      state.isFetching = false;
      state.products = action.payload;
      state.productsCount = action.payload.productsCount;
    },
    fetchingFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    clearError: (state) => {
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const { fetchingStart, fetchingOrder, fetchingFailure, clearError } =
  productsSlice.actions;
export default productsSlice.reducer;
