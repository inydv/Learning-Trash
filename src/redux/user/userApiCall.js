import {
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
  FORGOT_PASSWORD_SUCCESS,
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
  ALL_USERS_START,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_START,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_START,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  UPDATE_USER_RESET,
  DELETE_USER_START,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  DELETE_USER_RESET,
  CLEAR_ERROR,
  MESSAGE_RESET,
  CHANGE_TOKEN_TIME
} from "./userRedux";
import { publicRequest, axiosJWT } from "../../requestMethods";

export const LOGIN = (email, password) => async (dispatch) => {
  dispatch(LOGIN_START());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.post("/login", { email, password }, config);
    dispatch(LOGIN_SUCCESS(res.data));
  } catch (error) {
    dispatch(LOGIN_FAIL(error.response.data.message));
  }
};

export const REGISTER = (userData) => async (dispatch) => {
  dispatch(REGISTER_START());
  try {
    const config = { headers: { "content-Type": "multipart/form-data" } }
    const res = await publicRequest.post("/register", userData, config, { withCredentials: true });
    dispatch(REGISTER_SUCCESS(res.data));
  } catch (error) {
    dispatch(REGISTER_FAIL(error.response.data.message));
  }
};

export const LOAD_USER = () => async (dispatch) => {
  dispatch(LOAD_USER_START());
  try {
    const res = await axiosJWT.get("/me");
    dispatch(LOAD_USER_SUCCESS(res.data));
  } catch (error) {
    dispatch(LOAD_USER_FAIL());
  }
};

export const LOGOUT = () => async (dispatch) => {
  dispatch(LOGOUT_START());
  try {
    const res = await axiosJWT.get('/logout')
    dispatch(LOGOUT_SUCCESS(res.data.message));
  } catch (error) {
    dispatch(LOGOUT_FAIL());
  }
}

export const FORGOT_PW = (email) => async (dispatch) => {
  dispatch(FORGOT_PASSWORD_START());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.post("/password/forgot", email, config);
    dispatch(FORGOT_PASSWORD_SUCCESS(res.data.message));
  } catch (error) {
    dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message));
  }
};

export const RESET_PW = (token, myForm) => async (dispatch) => {
  dispatch(RESET_PASSWORD_START());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.put(`/password/reset/${token}`, myForm, config);
    dispatch(RESET_PASSWORD_SUCCESS(res.data));
  } catch (error) {
    dispatch(RESET_PASSWORD_FAIL(error.response.data.message));
  }
};

export const UPDATE_PROFILE = (userData) => async (dispatch) => {
  dispatch(UPDATE_PROFILE_START());
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await axiosJWT.put("/me/update", userData, config);
    dispatch(UPDATE_PROFILE_SUCCESS(res.data.message));
  } catch (error) {
    dispatch(UPDATE_PROFILE_FAIL(error.response.data.message));
  }
};

export const UPDATE_PW = (password) => async (dispatch) => {
  dispatch(UPDATE_PASSWORD_START());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await axiosJWT.put("/password/update", password, config);
    dispatch(UPDATE_PASSWORD_SUCCESS(res.data));
  } catch (error) {
    dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
  }
};

export const GET_ALL_USER = () => async (dispatch) => {
  dispatch(ALL_USERS_START());
  try {
    const res = await axiosJWT.get("/admin/users");
    dispatch(ALL_USERS_SUCCESS(res.data.users));
  } catch (error) {
    dispatch(ALL_USERS_FAIL(error.response.data.message));
  }
};

export const GET_USER_DETAILS = (id) => async (dispatch) => {
  dispatch(USER_DETAILS_START());
  try {
    const res = await axiosJWT.get(`/admin/user/${id}`);
    dispatch(USER_DETAILS_SUCCESS(res.data.user));
  } catch (error) {
    dispatch(USER_DETAILS_FAIL(error.response.data.message));
  }
};

export const UPDATE_USER = (id) => async (dispatch) => {
  dispatch(UPDATE_USER_START());
  try {
    const res = await axiosJWT.put(`/admin/user/${id}`);
    dispatch(UPDATE_USER_SUCCESS(res.data.usered));
  } catch (error) {
    dispatch(UPDATE_USER_FAIL(error.response.data.message));
  }
};

export const RESET_UPDATE_USER = () => async (dispatch) => {
  dispatch(UPDATE_USER_RESET());
};

export const DELETE_USER = (id) => async (dispatch) => {
  dispatch(DELETE_USER_START());
  try {
    const res = await axiosJWT.delete(`/admin/user/${id}`);
    dispatch(DELETE_USER_SUCCESS(res.data.deletedUser));
  } catch (error) {
    dispatch(DELETE_USER_FAIL(error.response.data.message));
  }
};

export const RESET_DELETE_USER = () => async (dispatch) => {
  dispatch(DELETE_USER_RESET());
};

// CALLING BY DIFFERENT METHOD
export const CLEAR_ERRORS = (dispatch) => {
  dispatch(CLEAR_ERROR());
}

export const RESET_MESSAGE = () => (dispatch) => {
  dispatch(MESSAGE_RESET());
}

export const CHANGE_TOKENTIME = (time) => (dispatch) => {
  dispatch(CHANGE_TOKEN_TIME(time))
}