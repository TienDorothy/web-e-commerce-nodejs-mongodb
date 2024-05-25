import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router";

import LeftSideBar from "../components/LeftSideBar";
import Navbar from "../components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { loginActions, loginSelector } from "../store/loginSlice";

const Root = () => {
  const location = useLocation();
  const pathName = location.pathname.split("/")[1];
  const dispatch = useDispatch();
  const isLogin = useSelector(loginSelector.isAdmin);

  useEffect(() => {
    dispatch(loginActions.ON_LOGIN());
  }, []);
  return (
    <>
      <div className="flex h-screen bg-gray-100">
        <LeftSideBar />

        <div className="flex flex-col flex-1 overflow-y-auto">
          <Navbar />
          <main
            className="p-4 flex flex-col gap-6"
            id={pathName === "" ? "dashboard" : pathName}
          >
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};

export default Root;
