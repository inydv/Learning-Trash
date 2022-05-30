import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: null,
  },
  reducers: {
    fetching: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { fetching } = cartSlice.actions;
export default cartSlice.reducer;
