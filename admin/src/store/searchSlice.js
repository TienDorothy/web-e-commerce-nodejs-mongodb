import { createSlice } from "@reduxjs/toolkit";

export const initialState = {
  search: "",
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearch(state, action) {
      let data = action.payload;
      state.search = data;
    },
  },
});

export const searchActions = searchSlice.actions;
export const searchSelector = {
  search: (state) => state.search.search,
};
export default searchSlice.reducer;
