import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  SAVE_SHIPPING_DETAIL,
} from "./cartRedux";
import { axiosJWT } from "../../requestMethods";

export const ADD_ITEMS_TO_CART = (id, quantity) => async (dispatch, getState) => {
  const { data } = await axiosJWT.get(`/product/${id}`);
  dispatch(
    ADD_TO_CART({
      product: data.product._id,
      name: data.product.title,
      price: data.product.price,
      image: data.product.img[0].url,
      inStock: data.product.inStock,
      quantity,
    })
  );
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
};

export const REMOVE_ITEMS_FROM_CART = (id) => async (dispatch, getState) => {
  dispatch(REMOVE_CART_ITEM(id));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const SAVE_SHIPPING_INFO = (data) => async (dispatch) => {
  dispatch(SAVE_SHIPPING_DETAIL(data));
  localStorage.setItem("shippingInfo", JSON.stringify(data));
};
