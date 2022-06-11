import {
  ALL_PRODUCT_SUCCESS,
  ALL_PRODUCT_REQUEST,
  ALL_PRODUCT_FAIL
} from "./productsRedux";
import {
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
} from "./productRedux";
import { publicRequest } from "../../requestMethods";

export const fetchingAllProducts =
  (keyword = "", currentPage = 1, price = [0, 25000], category, ratings = 0, sort = "oldest") =>
    async (dispatch) => {
      dispatch(ALL_PRODUCT_REQUEST());
      try {
        let link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}&sort=${sort}`;

        if (category) {
          link = `/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}}&ratings[gte]=${ratings}&sort=${sort}`;
        }

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