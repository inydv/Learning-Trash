import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    isFetching: false,
    error: null,
    productsCount: 0,
    resultPerPage: 0,
  },
  reducers: {
    ALL_PRODUCT_START: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    ALL_PRODUCT_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.products = action.payload.products;
      state.productsCount = action.payload.productsCount;
      state.resultPerPage = action.payload.resultPerPage;
    },
    ALL_PRODUCT_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.products = null;
      state.productsCount = 0;
      state.resultPerPage = 0;
    },

    PRODUCT_DETAILS_START: (state) => {
      state.isFetching = true;
      state.error = null;
      state.productsCount = 0;
      state.resultPerPage = 0;
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.products = action.payload.product;
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.products = null;
    },
  },
});

export const {
  ALL_PRODUCT_START,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  PRODUCT_DETAILS_START,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} = productsSlice.actions;
export default productsSlice.reducer;
