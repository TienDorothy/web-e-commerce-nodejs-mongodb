import { createSlice } from "@reduxjs/toolkit";

import {
  setLocalStorage,
  getFromStorage,
  addToListLocalStorage,
} from "./setLocalStorage";

export const initialState = {
  listCart: [],
  numberCart: 0,
  totalCart: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    GET_CART(state) {
      state.listCart = getFromStorage("listCart") || [];
      state.totalCart = state.listCart.reduce(
        (sum, item) =>
          sum + parseInt(item?.product.price) * parseInt(item?.quantity),
        0
      );
      state.numberCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
    },
    ADD_CART(state, action) {
      const newItem = action.payload;
            const list = addToListLocalStorage("listCart", newItem);
      state.listCart = list;

      state.totalCart = state.listCart.reduce(
        (sum, item) =>
          sum + parseInt(item?.product.price) * parseInt(item?.quantity),
        0
      );
      state.numberCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
    },
    UPDATE_CART(state, action) {
      const newUpdate = action.payload;
      const _id = newUpdate._id;
      const newQuantity = parseInt(newUpdate.quantity);

      let listCart = getFromStorage("listCart");
      const indexUpdate = listCart.findIndex(
        (item) => item.product._id === _id
      );
      listCart[indexUpdate].quantity = newQuantity;

      state.listCart = listCart;
      setLocalStorage("listCart", listCart);

      state.totalCart = state.listCart.reduce(
        (sum, item) => sum + item?.product.price * item?.quantity,
        0
      );
      state.numberCart = state.listCart.reduce(
        (sum, item) => sum + item.quantity,
        0
      );
    },
    REMOVE_CART(state) {
      setLocalStorage("listCart", []);
      state.listCart = [];
      state.totalCart = 0;
      state.numberCart = 0;
    },

    DELETE_ITEM(state, action) {
      const idRemove = action.payload;
      // get from localStorage
      let listStore = getFromStorage("listCart");
      state.listCart = listStore.filter(
        (item) => item.product._id !== idRemove
      );

      state.totalCart = state.listCart.reduce(
        (sum, item) =>
          sum + parseInt(item?.product.price) * parseInt(item?.quantity),
        0
      );
      state.numberCart = state.listCart.reduce(
        (sum, item) => sum + parseInt(item.quantity),
        0
      );
      localStorage.setItem("listCart", JSON.stringify(state.listCart));
    },
  },
});

export const cartActions = cartSlice.actions;
export const cartSelector = {
  listCart: (state) => state.cart.listCart,
  numberCart: (state) => state.cart.numberCart,
  totalCart: (state) => state.cart.totalCart,
};
export default cartSlice.reducer;
