import {
  NEW_REVIEW_REQUEST,
  NEW_REVIEW_SUCCESS,
  NEW_REVIEW_FAIL,
  NEW_REVIEW_RESET,
  ALL_REVIEW_REQUEST,
  ALL_REVIEW_SUCCESS,
  ALL_REVIEW_FAIL,
  DELETE_REVIEW_REQUEST,
  DELETE_REVIEW_SUCCESS,
  DELETE_REVIEW_FAIL,
  DELETE_REVIEW_RESET
} from "./reviewRedux";
import { axiosJWT } from "../../requestMethods";

export const NEW_REVIEW = (reviewData) => async (dispatch) => {
  dispatch(NEW_REVIEW_REQUEST());
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    }
    const { data } = await axiosJWT.put(`/review`, reviewData, config);
    dispatch(NEW_REVIEW_SUCCESS(data));
  } catch (error) {
    dispatch(NEW_REVIEW_FAIL(error.response.data.message));
  }
};

export const RESET_NEW_REVIEW = () => async (dispatch) => {
  dispatch(NEW_REVIEW_RESET());
};

export const ALL_REVIEW = (id) => async (dispatch) => {
  dispatch(ALL_REVIEW_REQUEST());
  try {
    const { data } = await axiosJWT.get(`/review?id=${id}`);
    dispatch(ALL_REVIEW_SUCCESS(data));
  } catch (error) {
    dispatch(ALL_REVIEW_FAIL(error.response.data.message));
  }
};

export const DELETE_REVIEW = (reviewId, productId) => async (dispatch) => {
  dispatch(DELETE_REVIEW_REQUEST());
  try {
    const { data } = await axiosJWT.delete(`/review?id=${reviewId}&productId=${productId}`);
    dispatch(DELETE_REVIEW_SUCCESS(data));
  } catch (error) {
    dispatch(DELETE_REVIEW_FAIL(error.response.data.message));
  }
};

export const RESET_DELETE_REVIEW = () => async (dispatch) => {
  dispatch(DELETE_REVIEW_RESET());
};