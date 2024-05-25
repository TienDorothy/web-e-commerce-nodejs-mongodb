import React, { useEffect } from "react";
import { Navbar, Footer, LiveChat } from "../components";
import { Outlet, json, useLoaderData } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";
import { productListActions } from "../store/productListSlice";

import styles from "../style";
import { loginActions, loginSelector } from "../store/loginSlice";
import api from "../api/api";
import { API_PATHS } from "../api/apiPath";

const Root = () => {
  const dispatch = useDispatch();
  const data = useLoaderData();
  const isLogin = useSelector(loginSelector.isLogin);

  useEffect(() => {
    dispatch(productListActions.setProduct(data));
    dispatch(cartActions.GET_CART());
    dispatch(loginActions.ON_LOGIN());
  }, [isLogin]);

  //
  return (
    <>
      <main className="min-h-screen flex flex-col w-full">
        <Navbar />
        <div id="main-container" className={`${styles.boxContainer}`}>
          <Outlet />
        </div>
        <LiveChat />
        <Footer />
      </main>
    </>
  );
};

export default Root;
export async function loader({ request, params }) {
  const response = await api.get(API_PATHS.GET_PRODUCTS);
  if (!response) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const data = await response.data;
    return data.products;
  }
}
