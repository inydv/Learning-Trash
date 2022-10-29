import {
  ALL_PRODUCT_START,
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_FAIL,
  ADMIN_PRODUCT_START,
  ADMIN_PRODUCT_SUCCESS,
  ADMIN_PRODUCT_FAIL,
  NEW_PRODUCT_REQUEST,
  NEW_PRODUCT_SUCCESS,
  NEW_PRODUCT_FAIL,
  NEW_PRODUCT_RESET,
  DELETE_PRODUCT_REQUEST,
  DELETE_PRODUCT_SUCCESS,
  DELETE_PRODUCT_FAIL,
  DELETE_PRODUCT_RESET,
  UPDATE_PRODUCT_REQUEST,
  UPDATE_PRODUCT_SUCCESS,
  UPDATE_PRODUCT_FAIL,
  UPDATE_PRODUCT_RESET,
  PRODUCT_DETAILS_START,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "./productsRedux";
import { axiosJWT } from "../../requestMethods";

export const FETCHING_ALL_PRODUCT =
  (
    keyword = "",
    currentPage = 1,
    price = [0, 25000],
    category,
    ratings = 0,
    sort = "oldest"
  ) =>
    async (dispatch) => {
      dispatch(ALL_PRODUCT_START());
      try {
        let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[lte]=${ratings}&sort=${sort}`;

        if (category) {
          link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[lte]=${ratings}&sort=${sort}`;
        }

        const { data } = await axiosJWT.get(link);
        dispatch(ALL_PRODUCT_SUCCESS(data));
      } catch (error) {
        dispatch(ALL_PRODUCT_FAIL(error.response.data.message));
      }
    };

export const ADMIN_ALL_PRODUCT = () => async (dispatch) => {
  dispatch(ADMIN_PRODUCT_START());
  try {
    const { data } = await axiosJWT.get(`/admin/products`);
    dispatch(ADMIN_PRODUCT_SUCCESS(data));
  } catch (error) {
    dispatch(ADMIN_PRODUCT_FAIL(error.response.data.message));
  }
};

export const NEW_PRODUCT = (productData) => async (dispatch) => {
  dispatch(NEW_PRODUCT_REQUEST());
  try {
    const config = {
      headers: { "Content-Type": "application/json" }
    }
    const { data } = await axiosJWT.post(`/admin/product/new`, productData, config);
    dispatch(NEW_PRODUCT_SUCCESS(data));
  } catch (error) {
    dispatch(NEW_PRODUCT_FAIL(error.response.data.message));
  }
};

export const RESET_NEW_PRODUCT = () => async (dispatch) => {
  dispatch(NEW_PRODUCT_RESET());
};

export const DELETE_PRODUCT = (id) => async (dispatch) => {
  dispatch(DELETE_PRODUCT_REQUEST());
  try {
    const { data } = await axiosJWT.delete(`/admin/product/${id}`);
    dispatch(DELETE_PRODUCT_SUCCESS(data));
  } catch (error) {
    dispatch(DELETE_PRODUCT_FAIL(error.response.data.message));
  }
};

export const RESET_DELETE_PRODUCT = () => async (dispatch) => {
  dispatch(DELETE_PRODUCT_RESET());
};

export const UPDATE_PRODUCT = (id) => async (dispatch) => {
  dispatch(UPDATE_PRODUCT_REQUEST());
  try {
    const { data } = await axiosJWT.put(`/admin/product/${id}`);
    dispatch(UPDATE_PRODUCT_SUCCESS(data));
  } catch (error) {
    dispatch(UPDATE_PRODUCT_FAIL(error.response.data.message));
  }
};

export const RESET_UPDATE_PRODUCT = () => async (dispatch) => {
  dispatch(UPDATE_PRODUCT_RESET());
};

export const GET_PRODUCT_DETAIL = (id) => async (dispatch) => {
  dispatch(PRODUCT_DETAILS_START());
  try {
    const { data } = await axiosJWT.get(`/product/${id}`);
    dispatch(PRODUCT_DETAILS_SUCCESS(data));
  } catch (error) {
    dispatch(PRODUCT_DETAILS_FAIL(error.response.data.message));
  }
};
