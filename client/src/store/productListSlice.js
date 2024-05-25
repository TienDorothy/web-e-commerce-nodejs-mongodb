import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage } from "./setLocalStorage";

export const initialState = {
  productList: [],
  productFilter: [],
  categories: "all",
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProduct(state, action) {
      const data = action.payload;
      state.productList = data;
      state.productFilter = data;
    },

    setCategory(state, action) {
      const categories = action.payload;
      state.categories = categories;
      //  item => item.category.toLowerCase() === categories.toLowerCase()
      if (categories !== "all") {
        const filter = state.productList.filter(
          (item) => item.category.toLowerCase() === categories.toLowerCase()
        );
        state.productFilter = filter;
      } else {
        state.productFilter = state.productList;
      }
    },
  },
});

export const productListActions = productListSlice.actions;
export const productListSelector = {
  productList: (state) => state.productList.productList,
  productFilter: (state) => state.productList.productFilter,
  categories: (state) => state.productList.categories,
};
export default productListSlice.reducer;
