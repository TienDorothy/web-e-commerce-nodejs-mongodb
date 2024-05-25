import React from "react";
import { PriceFormat } from "../UI";
import { useNavigate } from "react-router";

//---------------//
const titleTable = [
  "id user",
  "name",
  "phone",
  "address",
  "total",
  "delivery",
  "status",
  "detail",
];
//---------------//
export default function TableOrder({ data }) {
  const navigate = useNavigate();

  const viewHandler = (id) => {
    navigate(`/orders/${id}`);
  };
  return (
    <section id="orders">
      {Array.isArray(data) && data.length !== 0 ? (
        <table
          id="info-product"
          className="min-w-full bg-white border shadow-sm divide-y divide-gray-200"
        >
          <thead className="bg-gray-300 uppercase text-md font-semibold text-left ">
            <tr>
              {titleTable.map((item, i) => (
                <th className="p-4" key={i}>
                  {" "}
                  {item}{" "}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {data.map((item, i) => (
              <tr key={i} className={`text-left ${i%2 !==0 ? 'bg-gray-100' :''}`}>
                <td className="px-2 py-4"> {item.userId._id.toString()} </td>
                <td className="px-2 py-4"> {item.userId.fullName} </td>
                <td className="px-2 py-4">{item.userId.phone}</td>
                <td className="px-2 py-4">{item.userId.address}</td>
                <td className="px-2 py-4">
                  {" "}
                  <PriceFormat price={item.total} />{" "}
                </td>
                <td className="px-2 py-4">
                  {" "}
                  {item.delivery === "processing"
                    ? "Chưa vận chuyển"
                    : "Đã vận chuyển"}{" "}
                </td>
                <td className="px-2 py-4">
                  {" "}
                  {item.status === "pay"
                    ? "Chưa thanh toán"
                    : "Đã thanh toán"}{" "}
                </td>
                <td className="px-2 py-4">
                  <button
                    className="btn btn-sm btn-outline btn-accent mr-2"
                    onClick={() => viewHandler(item._id.toString())}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h3>No value</h3>
      )}
    </section>
  );
}
