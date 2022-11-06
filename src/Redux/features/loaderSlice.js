import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  currentPage: "",
};

const loaderSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});
export const { setLoader, setCurrentPage } = loaderSlice.actions;
export default loaderSlice.reducer;
