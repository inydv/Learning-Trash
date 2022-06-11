import { loginFailure, loginStart, loginOrder, RegisterStart, RegisterOrder, RegisterFailure, clearError } from "./authRedux";
import { publicRequest } from "../../requestMethods";

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.post("/login", {email,password}, config);
    dispatch(loginOrder(res.data));
    // res.data && window.location.replace("/");
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const Register = (userData) => async (dispatch) => {
  dispatch(RegisterStart());
  try {
    const config = { headers: { "content-Type": "multipart/form-data"}}
    await publicRequest.post("/register", userData, config, {withCredentials: true});
    dispatch(RegisterOrder());
  } catch (error) {
    dispatch(RegisterFailure(error.response.data.message));
  }
};

// export const signout = (dispatch) => {
//   dispatch(logout());
// };

export const clearErrors = (dispatch) => {
  dispatch(clearError());
}