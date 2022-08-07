import {
    My_ORDER_FAIL, My_ORDER_REQUEST, My_ORDER_SUCCESS, CLEAR_ERROR
  } from "./myOrderRedux";
  import { publicRequest } from "../../requestMethods";
  
  export const GETTING_ORDER = () => async (dispatch) => {
    dispatch(My_ORDER_REQUEST());
    try {
      const { data } = await publicRequest.get("/order/me");
      dispatch(My_ORDER_SUCCESS(data.orders));
    } catch (error) {
      dispatch(My_ORDER_FAIL(error.response.data.message));
    }
  };
  
  export const CLEAR_ERRORS = () => async (dispatch) => {
    dispatch(CLEAR_ERROR());
  };
  