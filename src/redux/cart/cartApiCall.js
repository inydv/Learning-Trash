import {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_INFO,
} from "./cartRedux";
import { publicRequest } from "../../requestMethods";

export const addItemsToCart = (id, quantity) => async (dispatch) => {   // async (dispatch, getState)
    const { data } = await publicRequest.get(`/product/${id}`);
    dispatch(ADD_TO_CART({
        product: data.product._id,
        name: data.product.name,
        price: data.product.price,
        image: data.product.img[0].url,
        inStock: data.product.inStock,
        quantity
    }
    ));
    // localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems))
};

export const removeItemsFromCart = (id) => async (dispatch) => {
    dispatch(REMOVE_CART_ITEM(id))
}

export const saveShippingInfo = (data) => async (dispatch) => {
    dispatch(SAVE_SHIPPING_INFO(data))
}