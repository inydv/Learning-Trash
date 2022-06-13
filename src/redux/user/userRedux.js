import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    isFetching: false,
    error: false,
    isUpdated: false
  },
  reducers: {
    Update_Profile_Request: (state) => {
        state.isFetching = true;
        state.error = false;
        state.isUpdated = false;
    },
    Update_Profile_Success: (state) => {
        state.isFetching = false;
        state.isUpdated = true;
    },
    Update_Profile_Fail: (state,action) => {
        state.isFetching = false;
        state.error = action.payload;
    },
    Update_isUpdated: (state) => {
        state.isUpdated = null;
    },
    Update_Password_Request: (state) => {
        state.isFetching = true;
        state.error = false;
        state.isUpdated = false;
    },
    Update_Password_Success: (state) => {
        state.isFetching = false;
        state.isUpdated = true;
    },
    Update_Password_Fail: (state,action) => {
        state.isFetching = false;
        state.error = action.payload;
    }
  },
});

export const { Update_Profile_Request, Update_Profile_Success, Update_Profile_Fail, Update_isUpdated, Update_Password_Request, Update_Password_Success, Update_Password_Fail } =
  userSlice.actions;
export default userSlice.reducer;
