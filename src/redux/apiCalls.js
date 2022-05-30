import { loginFailure, loginStart, loginOrder, logout, refresh } from "./userRedux";
import { fetching } from "./cartRedux";
import { publicRequest, userRequest } from "../requestMethods";

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

export const reload = (dispatch => {
  dispatch(refresh());
})

export const fetchProducts = async (dispatch) => {
  try {
    const res = await userRequest.get(`/cart/6291f327418c26920d43b09c`);
    // const res = await userRequest.get(`/cart/${user}`);
    dispatch(fetching(res.data))
  } catch (error) {
    console.log(error)
  }
}