import { createSlice } from "@reduxjs/toolkit";

const myOrderSlice = createSlice({
    name: "myOrders",
    initialState: {
        orders: null,
        order: null,
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
        ORDER_DETAILS_START: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        ORDER_DETAILS_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.order = action.payload.order;
        },
        ORDER_DETAILS_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.order = null;
        },
        CLEAR_ERROR: (state) => {
            state.error = null;
        }
    },
});

export const {
    My_ORDER_FAIL, My_ORDER_REQUEST, My_ORDER_SUCCESS, ORDER_DETAILS_START, ORDER_DETAILS_FAIL, ORDER_DETAILS_SUCCESS, CLEAR_ERROR
} = myOrderSlice.actions;
export default myOrderSlice.reducer;
