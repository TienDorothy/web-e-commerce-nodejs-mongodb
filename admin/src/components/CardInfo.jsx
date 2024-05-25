import React from "react";

const CardInfo = ({ info }) => {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:flex xl:gap-7.5">
      {info.map((item, i) => (
        <div
          key={i}
          className="flex flex-col gap-6 content-end flex-1 card shadow-lg rounded-box  px-4 py-4 md:py-10  bg-white font-semibold"
        >
          <h2 className="capitalize truncate hover:overflow-visible text-3xl">
            {item.digit}
            <span className="text-sm">
              {item.type === "price" ? item.unit : ""}
            </span>
          </h2>
          <div className="flex justify-between ">
            <p className="text-green-500 flex flex-col justify-center">{item.name}</p>
            <div className="text-2xl text-blue-700 p-2 rounded-full  bg-gray-100">
              {item.icon}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardInfo;
