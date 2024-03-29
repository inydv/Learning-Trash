import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        newReview: null,
        allReview: null,
        deleteReview: null,
        isFetching: false,
        error: null,
    },
    reducers: {
        NEW_REVIEW_REQUEST: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        NEW_REVIEW_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.newReview = action.payload.message;
        },
        NEW_REVIEW_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        NEW_REVIEW_RESET: (state) => {
            state.newReview = null;
        },

        ALL_REVIEW_REQUEST: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        ALL_REVIEW_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.allReview = action.payload.reviews;
        },
        ALL_REVIEW_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.allReview = null;
        },

        DELETE_REVIEW_REQUEST: (state) => {
            state.isFetching = true;
            state.error = null;
        },
        DELETE_REVIEW_SUCCESS: (state, action) => {
            state.isFetching = false;
            state.deleteReview = action.payload.deletedReview;
        },
        DELETE_REVIEW_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
            state.deleteReview = null;
        },
        DELETE_REVIEW_RESET: (state, action) => {
            state.isFetching = false;
            state.error = null;
            state.deleteReview = null;
        },

        CLEAR_ERRORS: (state) => {
            state.error = null;
        }
    },
});

export const {
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    NEW_REVIEW_RESET,
    ALL_REVIEW_REQUEST,
    ALL_REVIEW_SUCCESS,
    ALL_REVIEW_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    DELETE_REVIEW_RESET,
    CLEAR_ERRORS
} = reviewsSlice.actions;
export default reviewsSlice.reducer;
