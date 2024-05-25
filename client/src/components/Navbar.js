import React, { useState } from "react";
import style from "../style";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserAlt, FaBars } from "react-icons/fa";
import { loginActions, loginSelector } from "../store/loginSlice";
import api from "../api/api";
import { API_PATHS } from "../api/apiPath";
import { getFromStorage } from "../store/setLocalStorage";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // check logged in user
  const login = useSelector(loginSelector.isLogin);
  let username = useSelector(loginSelector.username);
  let userId = useSelector(loginSelector.userId);
  const listCart = getFromStorage("listCart");
  let [open, setOpen] = useState(true);

  let number = useSelector((state) => state.cart.numberCart);

  const logoutHandler = async () => {
    await api.post(API_PATHS.POST_LOGOUT, {
      userId: userId,
      cart: listCart,
    });

    dispatch(loginActions.ON_LOGOUT());
    navigate("/");
  };

  const nameWeb = "Boutique";
  const homeLink = (
    <li className={`${style.flexCenter} gap-2`}>
      <NavLink to="/" className={style.navLink}>
        Home
      </NavLink>
    </li>
  );
  const shopLink = (
    <li className={`${style.flexCenter} gap-2`}>
      <NavLink to="/shop" className={style.navLink}>
        Shop
      </NavLink>
    </li>
  );
  const historyLink = (
    <li className={`${style.flexCenter} gap-2`}>
      <NavLink to="/history" className={style.navLink}>
        History
      </NavLink>
    </li>
  );
  const cartLink = (
    <>
      <li className={`${style.flexCenter} gap-2 md:${style.tooltipContainer}`}>
        <div className=" gap-2 relative">
          <FaShoppingCart />
          <span
            className={`absolute top-0 right-0 -translate-y-4 translate-x-4  px-2 bg-neutral-700 text-white text-sm rounded-full ${
              login ? "" : "hidden"
            }`}
          >
            {number ? number : 0}
          </span>
        </div>
        {/* hover CartLink show cart */}
        {login && (
          <div className={`md:${style.tooltipItem} w-[400px]`}>
            <div className="p-3 bg-stone-100">
              {/* <ListCartNavbar /> */}
              <button
                className="mt-5 btn btn-warning border-none w-full"
                onClick={() => navigate("/cart")}
              >
                Go to cart
              </button>
            </div>
          </div>
        )}
        <NavLink to={login ? "/cart" : "/login"} className={style.navLink}>
          Cart
        </NavLink>
      </li>
    </>
  );
  const loginLink = (
    <li className={`${style.flexCenter} gap-2 ${style.tooltipContainer}`}>
      <div className=" gap-2 ">
        <FaUserAlt />
      </div>
      {/* hover loginLink show more */}
      {login && (
        <div className={`${style.tooltipItem} w-[130px]`}>
          <ul className="p-3 bg-stone-100">
            {/* <li
              className="hover:text-orange-500 cursor-pointer pb-2 text-center "
              onClick={() => navigate("/setting")}
            >
              Setting
            </li> */}
            <li
              className="hover:text-orange-500 cursor-pointer pb-2 text-center "
              onClick={logoutHandler}
            >
              Logout
            </li>
          </ul>
        </div>
      )}
      <NavLink to={login ? "/setting" : "/login"} className={style.navLink}>
        {login ? username : "Login"}
      </NavLink>
    </li>
  );
  return (
    <>
      <nav className={`fixed w-full top-0 left-0 z-1000 relative`}>
        <div
          className={`${style.boxContainer} ${style.flexBetweenMd} ${style.padding} bg-white`}
        >
          <div className="font-bold text-2xl cursor-pointer flex items-center text-gray-800">
            <Link to="/">
              <h1>{nameWeb}</h1>
            </Link>
            {/* //! Search ??     */}
          </div>
          <div
            onClick={() => setOpen(!open)}
            className="text-3xl absolute right-8 top-6 cursor-pointer md:hidden"
          >
            <ion-icon name={open ? "close" : "menu"}>
              <FaBars />
            </ion-icon>
          </div>

          {/* list navbar */}
          <ul
            className={`flex justify-end md:flex md:flex-row  gap-6  ${
              style.padding
            } ${open ? "hidden" : ""} `}
          >
            {homeLink}
            {shopLink}
            {login && historyLink}
            {login && cartLink}
            {loginLink}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
