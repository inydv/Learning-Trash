import { createSlice } from "@reduxjs/toolkit";

const newsLetter = createSlice({
  name: "user",
  initialState: {
    show: true,
  },
  reducers: {
    changeState: (state) => {
      state.show = false;
    },
  },
});

export const { changeState } = newsLetter.actions;
export default newsLetter.reducer;
