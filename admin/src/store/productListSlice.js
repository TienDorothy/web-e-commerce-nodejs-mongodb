import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage, setLocalStorage } from "./setLocalStorage";

export const initialState = {
  products: [],
  productById: {},
  productResult: [],
};

const productListSlice = createSlice({
  name: "productList",
  initialState,
  reducers: {
    setProduct(state, action) {
      const products = action.payload;
      state.products = products;
      state.productResult=products

      setLocalStorage("products", products);
    },
    getProdById(state, action) {
      const prodId = action.payload;
      const prods = getFromStorage("products");
      const prodFind = prods.find((item) => item._id === prodId);

      state.productById = prodFind;
    },
    deleteById(state, action) {
      const prodId = action.payload;
      const prods = getFromStorage("products");
      const newProds = prods.filter((item) => item._id !== prodId);
      setLocalStorage("products", newProds);
      
      state.products = newProds;
    },

    searchByName(state, action) {
      const keyword = action.payload.toLowerCase().trim();
      let searchList = state.products;
      if (keyword.length !== 0) {
        searchList = state.products.filter((prod) =>
          prod.name.toLowerCase().includes(keyword)
        );
      }
      state.productResult = searchList;
    },
  },
});

export const productListActions = productListSlice.actions;
export const productListSelector = {
  products: (state) => state.productList.products,
  productById: (state) => state.productList.productById,
  productResult: (state) => state.productList.productResult,
};
export default productListSlice.reducer;
