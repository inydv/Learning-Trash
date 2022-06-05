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

export const signout = (dispatch) => {
  dispatch(logout());
};

export const clearErrors = (dispatch => {
  dispatch(clearError());
})