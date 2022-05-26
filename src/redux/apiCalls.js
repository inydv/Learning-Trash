import { loginFailure, loginStart, loginOrder, logout } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginOrder(res.data));
    res.data && window.location.replace("/");
  } catch (err) {
    dispatch(loginFailure());
  }
};

export const signout = (dispatch) => {
  dispatch(logout());
};
