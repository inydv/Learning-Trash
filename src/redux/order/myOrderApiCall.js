import {
  My_ORDER_FAIL, My_ORDER_REQUEST, My_ORDER_SUCCESS, ORDER_DETAILS_START, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, CLEAR_ERROR
} from "./myOrderRedux";
import { publicRequest } from "../../requestMethods";

export const MY_ORDER = () => async (dispatch) => {
  dispatch(My_ORDER_REQUEST());
  try {
    const { data } = await publicRequest.get("/order/me");
    dispatch(My_ORDER_SUCCESS(data.orders));
  } catch (error) {
    dispatch(My_ORDER_FAIL(error.response.data.message));
  }
};

export const GETTING_ORDER = (id) => async (dispatch) => {
  dispatch(ORDER_DETAILS_START());
  try {
    const { data } = await publicRequest.get(`/order/${id}`);
    dispatch(ORDER_DETAILS_SUCCESS(data.orders));
  } catch (error) {
    dispatch(ORDER_DETAILS_FAIL(error.response.data.message));
  }
};

export const CLEAR_ERRORS = () => async (dispatch) => {
  dispatch(CLEAR_ERROR());
};
