import { createSlice } from "@reduxjs/toolkit";

const newOrderSlice = createSlice({
  name: "newOrder",
  initialState: {
    orders: null,
    isFetching: false,
    error: null,
  },
  reducers: {
    CREATE_ORDER_REQUEST: (state) => {
      state.isFetching = true;
      state.error = null;
    },
    CREATE_ORDER_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.orders = action.payload;

    },
    CREATE_ORDER_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.products = null;
    },
    CLEAR_ERROR: (state) => {
      state.error = null;
    }
  },
});

export const {
  CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERROR
} = newOrderSlice.actions;
export default newOrderSlice.reducer;
