import { createSlice } from "@reduxjs/toolkit";

const reviewsSlice = createSlice({
    name: "reviews",
    initialState: {
        review: null,
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
            state.review = action.payload.review;
        },
        NEW_REVIEW_FAIL: (state, action) => {
            state.isFetching = false;
            state.error = action.payload;
        },
        NEW_REVIEW_RESET: (state) => {
            state.review = null;
        },
        CLEAR_ERRORS: (state) => {
            state.error = null;
        }
    },
});

export const {
    NEW_REVIEW_REQUEST, NEW_REVIEW_SUCCESS, NEW_REVIEW_FAIL, NEW_REVIEW_RESET, CLEAR_ERRORS
} = reviewsSlice.actions;
export default reviewsSlice.reducer;
