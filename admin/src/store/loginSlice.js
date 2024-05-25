import { createSlice } from "@reduxjs/toolkit";
import { getFromStorage, setLocalStorage } from "./setLocalStorage";
import Cookie from "universal-cookie";

//* get localStorage set isLogin
const initialState = {
  isAdmin: false,
  token: null,
  userId: "",
  email: "",
};

const cookie = new Cookie();

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    SET_LOGIN(state, actions) {
      const { user, isAdmin, token } = actions.payload;
      const { userId, email } = user;

      // localStorage
      setLocalStorage("userInfo", { userId, email });
      setLocalStorage("isLogin", true);
      setLocalStorage("token", token);

      // cookies
      cookie.set('jwt', token)
      cookie.set('userId', userId)

      // state
      state.isAdmin = isAdmin;
      state.userId = userId;
      state.email = email;
      state.token = token;
    },
    // dang nhap
    ON_LOGIN(state) {
      const userInfo = getFromStorage("userInfo");
      const isAdmin = getFromStorage("isLogin");
      const token = getFromStorage("token");

      state.userId = userInfo ? userInfo.userId : "";
      state.email = userInfo ? userInfo.email : "";
      state.isAdmin = isAdmin ? isAdmin : false;
      state.token = token ? token : null;

      setLocalStorage("userInfo", userInfo);
    },
    ON_LOGOUT(state) {
      localStorage.clear();
      cookie.remove("jwt");
      cookie.remove("userId");

      state.isAdmin = false;
      state.userId = "";
      state.email = "";
      state.token = null;
    },
  },
});

export const loginActions = loginSlice.actions;
export const loginSelector = {
  isAdmin: (state) => state.login.isAdmin,
  email: (state) => state.login.email,
  userId: (state) => state.login.userId,
  token: (state) => state.login.token,
};
export default loginSlice.reducer;
