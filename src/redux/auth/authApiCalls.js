import { loginFailure, loginStart, loginOrder, RegisterStart, RegisterOrder, RegisterFailure, Load_User_Start, Load_User_Order, Load_User_Failure, Logout_Success, Logout_Failure, clearError } from "./authRedux";
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