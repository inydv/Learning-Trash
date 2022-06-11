import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    loginOrder: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state,action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    RegisterStart: (state) => {
      state.isFetching = true;
      state.error = false;
      state.message = null;
    },
    RegisterOrder: (state) => {
      state.isFetching = false;
    },
    RegisterFailure: (state,action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.message = null;
    },
    // logout: (state) => {
    //   state.currentUser = null;
    //   state.isFetching = false;
    //   state.error = false;
    // },
    clearError: (state) => {
      state.isFetching = false;
      state.error = false;
      state.message = null;
    }
  },
});

export const { loginStart, loginOrder, loginFailure, RegisterStart, RegisterOrder, RegisterFailure, clearError } =
  authSlice.actions;
export default authSlice.reducer;
