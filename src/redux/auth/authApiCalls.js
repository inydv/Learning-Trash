import { loginFailure, loginStart, loginOrder, logout, clearError } from "./authRedux";
import { publicRequest } from "../../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/login", user);
    dispatch(loginOrder(res.data));
    res.data && window.location.replace("/");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const Register = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const config = { headers: { "content-Type": "multipart/form-data"}}
    const res = await publicRequest.post("/register", user);
    dispatch(loginOrder(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signout = (dispatch) => {
  dispatch(logout());
};

export const clearErrors = (dispatch => {
  dispatch(clearError());
})