import { configureStore } from "@reduxjs/toolkit";

import productsListReducer from "./productListSlice";
import loginReducer from "./loginSlice";
import searchReducer from "./searchSlice";
import orderReducer from "./ordersSlice";
const store = configureStore({
  reducer: {
    productList: productsListReducer,
    login: loginReducer,
    search: searchReducer,
    orders: orderReducer,
  },
});

export default store;
