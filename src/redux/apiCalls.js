import { loginFailure, loginStart, loginorder } from "./userRedux";
import { publicRequest } from "../requestMethods";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginorder(res.data));
  } catch (err) {
    dispatch(loginFailure());
  }
};
