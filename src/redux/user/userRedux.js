import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    allUser: null,
    singleUser: null,
    updateUser: null,
    deleteUser: null,
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
      state.currentUser = action.payload.user;
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
    REGISTER_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.user;
    },
    REGISTER_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.currentUser = null;
    },

    LOAD_USER_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    LOAD_USER_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload.user;
    },
    LOAD_USER_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.currentUser = null;
    },

    LOGOUT_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    LOGOUT_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.error = false;
      state.currentUser = null;
      state.message = action.payload;
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
      state.message = null;
    },

    UPDATE_PROFILE_START: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isUpdated = false;
    },
    UPDATE_PROFILE_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.isUpdated = true;
      state.message = action.payload;
    },
    UPDATE_PROFILE_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.message = null;
    },

    UPDATE_PASSWORD_START: (state) => {
      state.isFetching = true;
      state.error = false;
      state.isUpdated = false;
    },
    UPDATE_PASSWORD_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.isUpdated = true;
      state.message = action.payload;
    },
    UPDATE_PASSWORD_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.message = null;
    },

    UPDATE_ISUPDATED: (state) => {
      state.isUpdated = null;
    },

    ALL_USERS_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    ALL_USERS_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.allUser = action.payload;
    },
    ALL_USERS_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.allUser = null;
    },

    USER_DETAILS_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    USER_DETAILS_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.singleUser = action.payload;
    },
    USER_DETAILS_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.singleUser = null;
    },

    UPDATE_USER_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    UPDATE_USER_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.updateUser = action.payload;
    },
    UPDATE_USER_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.updateUser = null;
    },

    DELETE_USER_START: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    DELETE_USER_SUCCESS: (state, action) => {
      state.isFetching = false;
      state.deleteUser = action.payload;
    },
    DELETE_USER_FAIL: (state, action) => {
      state.isFetching = false;
      state.error = action.payload;
      state.deleteUser = null;
    },

    CLEAR_ERROR: (state) => {
      state.isFetching = false;
      state.error = false;
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
  LOGOUT_START,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  FORGOT_PASSWORD_START,
  FORGOT_PASSWORD_SUCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_START,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  UPDATE_PROFILE_START,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_PROFILE_FAIL,
  UPDATE_PASSWORD_START,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  UPDATE_ISUPDATED,
  ALL_USERS_START,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_START,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  CLEAR_ERROR,
} = userSlice.actions;
export default userSlice.reducer;
