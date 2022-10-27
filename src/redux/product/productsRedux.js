import { createSlice } from "@reduxjs/toolkit";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: null,
    adminProducts: null,
    newProduct: null,
    deleteProduct: null,
    updateProduct: null,
    singleproduct: null,
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

    ADMIN_PRODUCT_START: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    ADMIN_PRODUCT_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.adminProducts = action.payload.products;
    },
    ADMIN_PRODUCT_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.adminProducts = null;
      state.productsCount = 0;
      state.resultPerPage = 0;
    },

    NEW_PRODUCT_REQUEST: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    NEW_PRODUCT_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.newProduct = action.payload.product;
    },
    NEW_PRODUCT_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.newProduct = null;
    },
    NEW_PRODUCT_RESET: (state) => {
      state.newProduct = null;
      state.isFetching = false;
      state.error = null;
    },

    DELETE_PRODUCT_REQUEST: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    DELETE_PRODUCT_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.deleteProduct = action.payload.deletedProduct;
    },
    DELETE_PRODUCT_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.deleteProduct = null;
    },
    DELETE_PRODUCT_RESET: (state) => {
      state.isFetching = false;
      state.error = null;
      state.deleteProduct = null;
    },

    UPDATE_PRODUCT_REQUEST: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    UPDATE_PRODUCT_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.updateProduct = action.payload.updatedProduct;
    },
    UPDATE_PRODUCT_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.updateProduct = null;
    },
    UPDATE_PRODUCT_RESET: (state) => {
      state.isFetching = false;
      state.error = null;
      state.updateProduct = null;
    },

    PRODUCT_DETAILS_START: (state) => {
      state.isFetching = true;
      state.error = null;
      state.productsCount = 0;
      state.resultPerPage = 0;
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.singleproduct = action.payload.product;
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.singleproduct = null;
    },

    CLEAR_ERROR: (state) => {
      state.isFetching = false;
      state.error = false;
    },
  },
});

export const {
  ALL_PRODUCT_START,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ADMIN_PRODUCT_START,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  PRODUCT_DETAILS_START,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  CLEAR_ERROR
} = productsSlice.actions;
export default productsSlice.reducer;
