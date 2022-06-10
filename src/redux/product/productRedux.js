import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
  name: "product",
  initialState: {
    product: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    PRODUCT_DETAILS_REQUEST: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.product = action.payload.product;
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.product = null;
    },
  },
});

export const {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} = productSlice.actions;
export default productSlice.reducer;
