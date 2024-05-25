import React from "react";
import { Link } from "react-router-dom";
import {
  BsFillGridFill,
  BsFillBriefcaseFill,
  BsBasket,
  BsBarChartFill,
} from "react-icons/bs";

const LeftSidebar = () => {
  const navData = [
    { name: "Dashboard", icon: <BsFillGridFill />, link: "/" },
    { name: "Products", icon: <BsFillBriefcaseFill />, link: "/products" },
    { name: "Orders", icon: <BsBasket />, link: "orders" },
  ];

  const nameAdmin = "Admin Dashboard";
  return (
    <>
      {/* sidebar */}
      <div className="hidden md:flex flex-col gap-6 w-72 bg-blue-600 text-gray-100 px-6">
        <Link
          id="name-page"
          to={"/"}
          className="flex items-center justify-center gap-2 h-16 py-5 text-2xl font-bold mt-4"
        >
          <span>
            <BsBarChartFill />
          </span>
          {nameAdmin}
        </Link>
        {/* Add new product */}
        <Link to={"/products/new"}
        className="btn btn-accent text-gray-950 hover:text-gray-100"
        >New Product</Link>
        {/* list link */}
        <div className="flex flex-col flex-1 overflow-y-auto">
          <nav className="flex-1 w-full  text-xl">
            {navData.map((item, i) => (
              <Link
                key={i}
                to={item.link}
                className="flex items-center py-4 hover:bg-blue-800 w-full"
              >
                <span className="mx-3">{item.icon}</span>
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="mb-4">
      
        </div>
      </div>
    </>
  );
};

export default LeftSidebar;
