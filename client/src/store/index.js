import { configureStore } from '@reduxjs/toolkit';

import popupReducer from './popupSlice';
import productsListReducer from './productListSlice';
import loginReducer from './loginSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    popup: popupReducer,
    productList: productsListReducer,
    login: loginReducer,
    cart: cartReducer,
  },
});

export default store;
