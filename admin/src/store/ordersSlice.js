import { createSlice } from "@reduxjs/toolkit";
import { setLocalStorage } from "./setLocalStorage";

export const initialState = {
  orders: [],
  orderResult: [],
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    setOrders(state, action) {
      let data = action.payload;
      state.orders = data;
      state.orderResult = data;

      setLocalStorage("orders", data);
    },
    search(state, action) {
      const keyword = action.payload.toLowerCase().trim();

      let searchList = state.orders;

      if (keyword.length !== 0) {
        searchList = state.orders.filter(({ userId }) => {
          return (
            userId.fullName.toLowerCase().includes(keyword) ||
            userId.phone.includes(keyword) ||
            userId._id.includes(keyword)
          );
        });
      }
      state.orderResult = searchList;
    },
  },
});

export const orderActions = orderSlice.actions;
export const orderSelector = {
  orders: (state) => state.orders.orders,
  orderResult: (state) => state.orders.orderResult,
};
export default orderSlice.reducer;
