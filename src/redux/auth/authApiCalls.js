import { loginFailure, loginStart, loginOrder, RegisterStart, RegisterOrder, RegisterFailure, logout, clearError } from "./authRedux";
import { publicRequest } from "../../requestMethods";

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.post("/login", {email,password}, config);
    dispatch(loginOrder(res.data));
    // res.data && window.location.replace("/");
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const Register = (userData) => async (dispatch) => {
  dispatch(RegisterStart());
  try {
    const config = { headers: { "content-Type": "multipart/form-data"}}
    const res = await publicRequest.post("/register", userData, config);
    dispatch(RegisterOrder());
  } catch (error) {
    dispatch(RegisterFailure(error.message));
  }
};

// export const signout = (dispatch) => {
//   dispatch(logout());
// };

export const clearErrors = (dispatch) => {
  dispatch(clearError());
}