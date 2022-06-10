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
    },
    loginOrder: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    RegisterStart: (state) => {
      state.isFetching = true;
    },
    RegisterOrder: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    RegisterFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
    },
    clearError: (state) => {
      state.isFetching = false;
      state.error = false;
    }
  },
});

export const { loginStart, loginOrder, loginFailure, RegisterStart, RegisterOrder, RegisterFailure, logout, clearError } =
  authSlice.actions;
export default authSlice.reducer;
