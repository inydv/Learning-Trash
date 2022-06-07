import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL,
  clearError,
} from "./productsRedux";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "./productRedux";
import { publicRequest } from "../../requestMethods";

export const fetchingAllProducts = async (dispatch) => {
  dispatch(ALL_PRODUCT_REQUEST());
  try {
    let link = `/products`;
    const { data } = await publicRequest.get(link);
    dispatch(ALL_PRODUCT_SUCCESS(data));
  } catch (error) {
    dispatch(ALL_PRODUCT_FAIL(error.response.data.message));
  }
};

export const getProductDetails = (id) => async (dispatch) => {
  dispatch(PRODUCT_DETAILS_REQUEST());
  try {
    const { data } = await publicRequest.get(`/product/${id}`);
    dispatch(PRODUCT_DETAILS_SUCCESS(data));
  } catch (error) {
    dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
  }
};

export const clearErrors = (dispatch) => {
  dispatch(clearError());
};
