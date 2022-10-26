import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cartItems: [],
        shippingInfo: {},
    },
    reducers: {
        ADD_TO_CART: (state, action) => {
            const item = action.payload;

            let existed = false;

            state.cartItems.forEach((search) => {
                if (search.product === item.product) {
                    state.cartItems = state.cartItems.map((i) =>
                        i.product === item.product ? item : i
                    )
                    existed = true;
                }
            });

            if (existed === false) {
                state.cartItems.push(item);
            }
        },

        REMOVE_CART_ITEM: (state, action) => {
            state.cartItems = state.cartItems.filter((i) => i.product !== action.payload)
        },
        SAVE_SHIPPING_DETAIL: (state, action) => {
            state.shippingInfo = action.payload
        },
        CART_CLEAR: (state) => {
            state.cartItems = []
        }
    },
});

export const {
    ADD_TO_CART,
    REMOVE_CART_ITEM,
    SAVE_SHIPPING_DETAIL,
    CART_CLEAR
} = cartSlice.actions;
export default cartSlice.reducer;
