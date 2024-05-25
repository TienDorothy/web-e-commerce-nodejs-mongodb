import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginActions, loginSelector } from "../store/loginSlice";
import { API_PATHS } from "../api/apiPath";
import Search from "./Search";
import sendRequest from "../api/sendRequest";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // check logged in user
  const isAdmin = useSelector(loginSelector.isAdmin);
  const userId = useSelector(loginSelector.userId);

  const logoutHandler = async () => {
    const confirm = window.confirm("Are you sure? ");
    if (confirm) {
      const response = await sendRequest("post", API_PATHS.POST_LOGOUT, {
       userId: userId,
      });
      if (response.status === 200) {
        dispatch(loginActions.ON_LOGOUT());
        alert("Logout success.");
        navigate("/login");
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between h-16 bg-white border-b border-gray-200 p-4">
        <Search />
        {isAdmin ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <Link to={"/login"}>Login</Link>
        )}
      </div>
    </>
  );
};

export default Navbar;
