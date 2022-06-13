import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    message: null,
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
    loginFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    RegisterStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    RegisterOrder: (state) => {
      state.isFetching = false;
    },
    RegisterFailure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    // logout: (state) => {
    //   state.currentUser = null;
    //   state.isFetching = false;
    //   state.error = false;
    // },
    Load_User_Start: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    Load_User_Order: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    Load_User_Failure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.currentUser = null;
    },
    Logout_Success: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
    },
    Logout_Failure: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    Forgot_Password_Request: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    Forgot_Password_Success: (state, action) => {
      state.isFetching = false;
      state.message = action.payload;
    },
    Forgot_Password_Fail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    Reset_Password_Request: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    Reset_Password_Success: (state, action) => {
      state.isFetching = false;
      state.message = action.payload;
    },
    Reset_Password_Fail: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },
    clearError: (state) => {
      state.isFetching = false;
      state.error = false;
    }
  },
});

export const { loginStart, loginOrder, loginFailure, RegisterStart, RegisterOrder, RegisterFailure, Load_User_Start, Load_User_Order, Load_User_Failure, Logout_Success, Logout_Failure, Forgot_Password_Request, Forgot_Password_Success, Forgot_Password_Fail, Reset_Password_Request, Reset_Password_Success, Reset_Password_Fail, clearError } =
  authSlice.actions;
export default authSlice.reducer;
