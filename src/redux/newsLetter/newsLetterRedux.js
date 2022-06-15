import { createSlice } from "@reduxjs/toolkit";

const newsLetter = createSlice({
  name: "user",
  initialState: {
    show: true,
  },
  reducers: {
    CHANGE_STATE: (state) => {
      state.show = false;
    },
  },
});

export const { CHANGE_STATE } = newsLetter.actions;
export default newsLetter.reducer;
