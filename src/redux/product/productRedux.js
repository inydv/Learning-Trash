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
    },
    PRODUCT_DETAILS_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.product = action.payload;
    },
    PRODUCT_DETAILS_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} = productSlice.actions;
export default productSlice.reducer;
