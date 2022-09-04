import {
  My_ORDER_FAIL,
  My_ORDER_REQUEST,
  My_ORDER_SUCCESS,
  ALL_ORDER_FAIL,
  ALL_ORDER_REQUEST,
  ALL_ORDER_SUCCESS,
  UPDATE_ORDER_FAIL,
  UPDATE_ORDER_REQUEST,
  UPDATE_ORDER_SUCCESS,
  DELETE_ORDER_FAIL,
  DELETE_ORDER_REQUEST,
  DELETE_ORDER_SUCCESS,
  ORDER_DETAILS_START,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_SUCCESS,
} from "./myOrderRedux";
import { axiosJWT } from "../../requestMethods";

export const MY_ORDER = () => async (dispatch) => {
  dispatch(My_ORDER_REQUEST());
  try {
    const { data } = await axiosJWT.get("/order/me");
    dispatch(My_ORDER_SUCCESS(data.order));
  } catch (error) {
    dispatch(My_ORDER_FAIL(error.response.data.message));
  }
};

export const ALL_ORDER = () => async (dispatch) => {
  dispatch(ALL_ORDER_REQUEST());
  try {
    const { data } = await axiosJWT.get("/admin/orders");
    dispatch(ALL_ORDER_SUCCESS(data));
  } catch (error) {
    dispatch(ALL_ORDER_FAIL(error.response.data.message));
  }
};

export const UPDATE_ORDER = (id) => async (dispatch) => {
  dispatch(UPDATE_ORDER_REQUEST());
  try {
    const { data } = await axiosJWT.put(`/admin/order/${id}`);
    dispatch(UPDATE_ORDER_SUCCESS(data.updatedOrder));
  } catch (error) {
    dispatch(UPDATE_ORDER_FAIL(error.response.data.message));
  }
};

export const DELETE_ORDER = (id) => async (dispatch) => {
  dispatch(DELETE_ORDER_REQUEST());
  try {
    const { data } = await axiosJWT.delete(`/admin/order/${id}`);
    dispatch(DELETE_ORDER_SUCCESS(data.deletedOrder));
  } catch (error) {
    dispatch(DELETE_ORDER_FAIL(error.response.data.message));
  }
};

export const GETTING_ORDER = (id) => async (dispatch) => {
  dispatch(ORDER_DETAILS_START());
  try {
    const { data } = await axiosJWT.get(`/order/${id}`);
    dispatch(ORDER_DETAILS_SUCCESS(data.order));
  } catch (error) {
    dispatch(ORDER_DETAILS_FAIL(error.response.data.message));
  }
};
