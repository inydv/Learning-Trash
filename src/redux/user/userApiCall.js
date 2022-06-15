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
} from "./userRedux";
import { publicRequest } from "../../requestMethods";

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
    await publicRequest.post("/register", userData, config, { withCredentials: true });
    dispatch(REGISTER_SUCCESS());
  } catch (error) {
    dispatch(REGISTER_FAIL(error.response.data.message));
  }
};

export const LOAD_USER = () => async (dispatch) => {
  dispatch(LOAD_USER_START());
  try {
    const res = await publicRequest.get("/me");
    dispatch(LOAD_USER_SUCCESS(res.data));
  } catch (error) {
    dispatch(LOAD_USER_FAIL(error.response.data.message));
  }
};

export const LOGOUT = () => async (dispatch) => {
  try {
    await publicRequest.get('/logout')
    dispatch(LOGOUT_SUCCESS());
  } catch (error) {
    dispatch(LOGOUT_FAIL());
  }
}

export const FORGOT_PW = (email) => async (dispatch) => {
  dispatch(FORGOT_PASSWORD_START());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.post("/password/forgot", email, config);
    dispatch(FORGOT_PASSWORD_SUCESS(res.data.message));
  } catch (error) {
    dispatch(FORGOT_PASSWORD_FAIL(error.response.data.message));
  }
};

export const RESET_PW = (token, myForm) => async (dispatch) => {
  dispatch(RESET_PASSWORD_START());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.put(`/password/reset/${token}`, myForm, config);
    dispatch(RESET_PASSWORD_SUCCESS(res.data.message));
  } catch (error) {
    dispatch(RESET_PASSWORD_FAIL(error.response.data.message));
  }
};

// CALLING BY DIFFERENT METHOD
export const CLEAR_ERRORS = (dispatch) => {
  dispatch(CLEAR_ERROR());
}

export const UPDATE_PROFILE = (userData) => async (dispatch) => {
  dispatch(UPDATE_PROFILE_START());
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    const res = await publicRequest.put("/me/update", userData, config);
    dispatch(UPDATE_PROFILE_SUCCESS(res.data));
  } catch (error) {
    dispatch(UPDATE_PROFILE_FAIL(error.response.data.message));
  }
};

export const UPDATE_PW = (password) => async (dispatch) => {
  dispatch(UPDATE_PASSWORD_START());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.put("/password/update", password, config);
    dispatch(UPDATE_PASSWORD_SUCCESS(res.data));
  } catch (error) {
    dispatch(UPDATE_PASSWORD_FAIL(error.response.data.message));
  }
};

export const ISUPDATED = (dispatch) => {
  dispatch(UPDATE_ISUPDATED());
}