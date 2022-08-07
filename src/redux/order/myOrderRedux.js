import { createSlice } from "@reduxjs/toolkit";

const myOrderSlice = createSlice({
    name: "myOrder",
    initialState: {
        orders: null,
        isFetching: false,
        error: null,
    },
    reducers: {
        My_ORDER_REQUEST: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        My_ORDER_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.orders = action.payload;

        },
        My_ORDER_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.products = null;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        }
    },
});

export const {
    My_ORDER_FAIL, My_ORDER_REQUEST, My_ORDER_SUCCESS, CLEAR_ERROR
} = myOrderSlice.actions;
export default myOrderSlice.reducer;
