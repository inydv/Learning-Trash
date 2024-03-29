import { createSlice } from "@reduxjs/toolkit";

const myOrderSlice = createSlice({
    name: "myOrders",
    initialState: {
        myOrders: null,
        singleOrder: null,
        allOrders: null,
        deleteOrder: null,
        updateOrder: null,
        isFetching: false,
        error: null,
        totalAmount: 0,
    },
    reducers: {
        My_ORDER_REQUEST: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        My_ORDER_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.myOrders = action.payload;
        },
        My_ORDER_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.myOrders = null;
        },

        ALL_ORDER_REQUEST: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        ALL_ORDER_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.allOrders = action.payload.orders;
            state.totalAmount = action.payload.totalAmount;
        },
        ALL_ORDER_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.allOrders = null;
            state.totalAmount = 0;
        },

        UPDATE_ORDER_REQUEST: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        UPDATE_ORDER_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.updateOrder = action.payload;
        },
        UPDATE_ORDER_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.updateOrder = null;
        },
        UPDATE_ORDER_RESET: (state) => {
            state.isFetching = false;
            state.error = null;
            state.updateOrder = null;
        },

        DELETE_ORDER_REQUEST: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        DELETE_ORDER_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.deleteOrder = action.payload;
        },
        DELETE_ORDER_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.deleteOrder = null;
        },
        DELETE_ORDER_RESET: (state) => {
            state.isFetching = false;
            state.error = null;
            state.deleteOrder = null;
        },

        ORDER_DETAILS_START: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        ORDER_DETAILS_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.singleOrder = action.payload;
        },
        ORDER_DETAILS_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.singleOrder = null;
        },

        CLEAR_ERROR: (state) => {
            state.error = null;
        }
    },
});

export const {
    My_ORDER_FAIL,
    My_ORDER_REQUEST,
    My_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    UPDATE_ORDER_RESET,
    UPDATE_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_RESET,
    ORDER_DETAILS_START,
    ORDER_DETAILS_FAIL,
    ORDER_DETAILS_SUCCESS,
    CLEAR_ERROR
} = myOrderSlice.actions;
export default myOrderSlice.reducer;
