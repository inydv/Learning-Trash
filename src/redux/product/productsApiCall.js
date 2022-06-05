import { fetchingStart, fetchingOrder, fetchingFailure, clearError } from "./productsRedux";
import { publicRequest } from "../../requestMethods";

export const fetchingProducts = async (dispatch) => {
  dispatch(fetchingStart());
  try {
    const res = await publicRequest.get("/products");
    dispatch(fetchingOrder(res.data));
  } catch (err) {
    dispatch(fetchingFailure());
  }
};

export const clearErrors = (dispatch => {
  dispatch(clearError());
})