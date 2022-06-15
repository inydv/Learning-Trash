import {
  CREATE_ORDER_FAIL, CREATE_ORDER_REQUEST, CREATE_ORDER_SUCCESS, CLEAR_ERROR
} from "./newOrderRedux";
import { publicRequest } from "../../requestMethods";

export const createOrder = (order) => async (dispatch) => {
  dispatch(CREATE_ORDER_REQUEST());
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      }
    }
    const { data } = await publicRequest.post("/order/new", order, config);
    dispatch(CREATE_ORDER_SUCCESS(data));
  } catch (error) {
    dispatch(CREATE_ORDER_FAIL(error.response.data.message));
  }
};

export const clearErrors = () => async (dispatch) => {
  dispatch(CLEAR_ERROR())
}
