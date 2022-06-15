import { loginFailure, loginStart, loginOrder, RegisterStart, RegisterOrder, RegisterFailure, Load_User_Start, Load_User_Order, Load_User_Failure, Logout_Success, Logout_Failure, Forgot_Password_Request, Forgot_Password_Success, Forgot_Password_Fail, Reset_Password_Request, Reset_Password_Success, Reset_Password_Fail, clearError } from "./authRedux";
import { publicRequest } from "../../requestMethods";

export const login = (email, password) => async (dispatch) => {
  dispatch(loginStart());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.post("/login", { email, password }, config);
    dispatch(loginOrder(res.data));
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
  }
};

export const Register = (userData) => async (dispatch) => {
  dispatch(RegisterStart());
  try {
    const config = { headers: { "content-Type": "multipart/form-data" } }
    await publicRequest.post("/register", userData, config, { withCredentials: true });
    dispatch(RegisterOrder());
  } catch (error) {
    dispatch(RegisterFailure(error.response.data.message));
  }
};

export const loadUser = () => async (dispatch) => {
  dispatch(Load_User_Start());
  try {
    const res = await publicRequest.get("/me");
    dispatch(Load_User_Order(res.data));
  } catch (error) {
    dispatch(Load_User_Failure(error.response.data.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    await publicRequest.get('/logout')
    dispatch(Logout_Success());
  } catch (error) {
    dispatch(Logout_Failure());
  }
}

// export const signout = (dispatch) => {
//   dispatch(logout());
// };

export const clearErrors = (dispatch) => {
  dispatch(clearError());
}

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(Forgot_Password_Request());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.post("/password/forgot", email, config);
    dispatch(Forgot_Password_Success(res.data.message));
  } catch (error) {
    dispatch(Forgot_Password_Fail(error.response.data.message));
  }
};

export const ResetPassword = (token, myForm) => async (dispatch) => {
  dispatch(Reset_Password_Request());
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    const res = await publicRequest.put(`/password/reset/${token}`, myForm, config);
    dispatch(Reset_Password_Success(res.data.message));
  } catch (error) {
    dispatch(Reset_Password_Fail(error.response.data.message));
  }
};
