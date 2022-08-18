import {
  NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, CLEAR_ERRORS
} from "./reviewRedux";
import { axiosJWT } from "../../requestMethods";

export const NEW_REVIEW = (reviewData) => async (dispatch) => {
  dispatch(NEW_REVIEW_REQUEST());
  try {
    const config = {
      headers: {"Content-Type": "application/json"}
    }
    const { data } = await axiosJWT.put(`/review`, reviewData, config);
    dispatch(NEW_REVIEW_SUCCESS(data));
  } catch (error) {
    dispatch(NEW_REVIEW_FAIL(error.response.data.message));
  }
};

export const CLEAR_ERROR = () => async (dispatch) => {
  dispatch(CLEAR_ERRORS());
};