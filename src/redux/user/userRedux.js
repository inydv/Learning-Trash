import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
    message: null,
    isUpdated: false,
  },
  reducers: {
    LOGIN_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    LOGIN_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    LOGIN_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.currentUser = null;
    },

    REGISTER_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    REGISTER_SUCCESS: (state) => {
      state.isFetching = false;
    },
    REGISTER_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    LOAD_USER_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
    },
    LOAD_USER_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.currentUser = null;
    },

    LOGOUT_SUCCESS: (state) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
    },
    LOGOUT_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    FORGOT_PASSWORD_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    FORGOT_PASSWORD_SUCESS: (state, action) => {
      state.isFetching = false;
      state.message = action.payload;
    },
    FORGOT_PASSWORD_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    RESET_PASSWORD_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    RESET_PASSWORD_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.message = action.payload;
    },
    RESET_PASSWORD_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    CLEAR_ERROR: (state) => {
      state.isFetching = false;
      state.error = false;
    },

    UPDATE_PROFILE_START: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isUpdated = false;
    },
    UPDATE_PROFILE_SUCCESS: (state) => {
      state.isFetching = false;
      state.isUpdated = true;
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    UPDATE_PASSWORD_START: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isUpdated = false;
    },
    UPDATE_PASSWORD_SUCCESS: (state) => {
      state.isFetching = false;
      state.isUpdated = true;
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
    },

    UPDATE_ISUPDATED: (state) => {
      state.isUpdated = null;
    },
  },
});

export const {
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_START,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOAD_USER_START,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  CLEAR_ERROR,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_ISUPDATED,
} = userSlice.actions;
export default userSlice.reducer;
