import React from "react";
import { PriceFormat } from "../UI";

export default function Table({ dataList, handleAction, tableName }) {
  return (
    <table
      id="info"
      className="min-w-full bg-white border shadow-sm divide-y divide-gray-200"
    >
      {/* head */}
      <thead className="bg-gray-300 uppercase text-md font-semibold text-left ">
        <tr>
          {tableName.map((item, i) => (
            <th className="p-4" key={i}>
              {" "}
              {item.th}{" "}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {dataList.map((data, i) => (
          <tr
            key={i}
            className={`text-left ${i % 2 !== 0 ? "bg-gray-100" : ""}`}
          >
            {tableName.map((item, i) => {
              // get value from data
              let value = item.td_sub
                ? data[item.td][item.td_sub]
                : data[item.td];
              return (
                <td
                  key={i}
                  className={`px-4 ${
                    item.type === "button" ? "flex h-full py-8" : "py-4"
                  }`}
                >
                  {item.type === "button" ? (
                    item.action.map((action, j) => (
                      <button
                        key={j}
                        className={`btn btn-sm btn-outline mr-2 ${
                          action === "update" || action === "view"
                            ? "btn-accent"
                            : "btn-error"
                        }`}
                        onClick={() => handleAction(action, data)}
                      >
                        {action}
                      </button>
                    ))
                  ) : item.type === "price" ? (
                    <PriceFormat price={value} />
                  ) : item.type === "img" ? (
                    <img
                      className="w-20 h-20 object-cover"
                      src={value}
                      alt={data.name}
                    />
                  ) : (
                    value
                  )}
                </td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
