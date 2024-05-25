import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage, setLocalStorage } from "./setLocalStorage";
import Cookie from "universal-cookie";

//* get localStorage set isLogin
const initialState = {
  isLogin: false,
  userId: "",
  username: "",
  fullName: "",
  email: "",
  phone: "",
  address: "",
  token: null,
};

const cookie = new Cookie();

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    SET_LOGIN(state, actions) {
      const { user, token } = actions.payload;
      const { cart, ...userInfo } = user;
      state.isLogin = true;

      // localStorage
      setLocalStorage("userInfo", userInfo);
      setLocalStorage("token", token);
      setLocalStorage("listCart", cart);

      // cookies
      cookie.set("jwt", token);
      cookie.set("userId", userInfo?.userId);
    },
    // dang nhap
    ON_LOGIN(state) {
      // check cookie
      const token = getFromStorage("token");
      const userInfo = getFromStorage("userInfo");

      if (token && userInfo) {
        state.username = userInfo.username;
        state.fullName = userInfo.fullName;
        state.userId = userInfo.userId;
        state.email = userInfo.email;
        state.phone = userInfo.phone;
        state.address = userInfo.address;

        state.isLogin = true;
        state.token = token;
      }
    },
    ON_LOGOUT(state) {
      localStorage.clear();
      cookie.remove("jwt");
      cookie.remove("userId");

      state.isLogin = false;
      state.userId = "";
      state.username = "";
      state.fullName = "";
      state.email = "";
      state.phone = "";
      state.address = "";
      state.token = null;
    },
  },
});

export const loginActions = loginSlice.actions;
export const loginSelector = {
  isLogin: (state) => state.login.isLogin,
  username: (state) => state.login.username,
  email: (state) => state.login.email,
  userId: (state) => state.login.userId,
  token: (state) => state.login.token,
};
export default loginSlice.reducer;
