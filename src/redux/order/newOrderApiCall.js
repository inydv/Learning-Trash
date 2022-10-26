import {
  CREATE_ORDER_FAIL,
  CREATE_ORDER_REQUEST,
  CREATE_ORDER_SUCCESS,
  CLEAR_ERROR,
} from "./newOrderRedux";
import { axiosJWT } from "../../requestMethods";

export const CREATE_ORDER = (order) => async (dispatch) => {
  dispatch(CREATE_ORDER_REQUEST());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axiosJWT.post("/order/new", order, config);
    dispatch(CREATE_ORDER_SUCCESS(data));
    localStorage.getItem("cartItems") && localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch(CREATE_ORDER_FAIL(error.response.data.message));
  }
};

export const CLEAR_ERRORS = () => async (dispatch) => {
  dispatch(CLEAR_ERROR());
};
