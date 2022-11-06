import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShowSearch: false,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    handleShowSearch: (state, action) => {
      state.isShowSearch = action.payload;
    },
  },
});
export const { handleShowSearch } = searchSlice.actions;
export default searchSlice.reducer;
