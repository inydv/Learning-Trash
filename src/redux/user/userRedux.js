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
    }
  },
});

export const { Update_Profile_Request, Update_Profile_Success, Update_Profile_Fail, Update_isUpdated } =
  userSlice.actions;
export default userSlice.reducer;
