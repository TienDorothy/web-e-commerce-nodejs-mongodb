import React, { useState } from "react";
import { Header } from "../components";
import {  PriceFormat } from "../UI";

import api from "../api/api";
import { API_PATHS } from "../api/apiPath";
import { getFromStorage } from "../store/setLocalStorage";
import { json, useLoaderData } from "react-router";
import { FaLongArrowAltRight } from "react-icons/fa";

// ------------------ ///
const HistoryPage = () => {
  const data = useLoaderData();
  const [detailOrder, setDetailOrder] = useState({});
  const [openDetailOrder, setOpenDetailOrder] = useState(false);

  const titleTable = [
    "id order",
    "id user",
    "name",
    "phone",
    "address",
    "total",
    "delivery",
    "status",
    "detail",
  ];
  const titleProduct = ["id product", "image", "name", "price", "count"];
  
  const detailHandler = (order) => {
    setDetailOrder(order);
    setOpenDetailOrder(true);
  };
  return (
    <>
      {data && (
        <section id="history" className="container italic">
          <Header title="history" children="history" />
          <div id="history-main">
            <div>
              <div className="overflow-x-auto">
                <table className="table w-full table-compact italic">
                  {/* head */}
                  <thead className="bg-bgPrimary uppercase text-lg">
                    <tr className="py-6">
                      {titleTable.map((item, i) => (
                        <th key={i}> {item} </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((order, i) => (
                      <tr key={i} className="text-center">
                        <td> {order._id.toString()} </td>
                        <td> {order.userId._id.toString()} </td>
                        <td> {order.userId.fullName} </td>
                        <td> {order.userId.phone} </td>
                        <td> {order.userId.address} </td>
                        <td>
                          <PriceFormat price={order.total} />
                          <p>VND</p>
                        </td>
                        <td>
                          Waiting for
                          <p>{order.delivery} </p>
                        </td>
                        <td>
                          Waiting for
                          <p>{order.status} </p>
                        </td>
                        <td>
                          <button
                            className="p-3 border border-black hover:bg-second"
                            onClick={() => detailHandler(order)}
                          >
                            Detail
                            <FaLongArrowAltRight className="inline-block ml-2" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* information order */}
          {openDetailOrder && (
            <div id="information" className="my-10">
              <h1 className="uppercase py-4">information order</h1>
              <ul id="info-user" className="pb-10">
                <li className="py-1">
                  ID Order: {detailOrder._id.toString()}{" "}
                </li>
                <li className="py-1">
                  ID User: {detailOrder.userId._id.toString()}{" "}
                </li>
                <li className="py-1">
                  Full Name: {detailOrder.userId.fullName}{" "}
                </li>
                <li className="py-1">Phone: {detailOrder.userId.phone} </li>
                <li className="py-1">Address: {detailOrder.userId.address} </li>
                <li className="py-1">
                  Total: <PriceFormat price={detailOrder.total} /> VND{" "}
                </li>
              </ul>
              <table
                id="info-product"
                className="table w-full table-compact italic"
              >
                {/* head */}
                <thead className="bg-bgPrimary uppercase text-lg text-center">
                  <tr className="py-6">
                    {titleProduct.map((item, i) => (
                      <th key={i}> {item} </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {detailOrder.products.map((item, i) => (
                    <tr key={i} className="text-center">
                      <td> {item.product._id.toString()} </td>
                      <td>
                        <img
                          className="w-40 h-40 object-cover"
                          src={item.product.img1}
                          alt={item.product.name}
                        />
                      </td>
                      <td> {item.product.name} </td>
                      <td>
                        <PriceFormat price={item.product.price} /> VND
                      </td>
                      <td> {item.quantity} </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </>
  );
};

export default HistoryPage;
export async function loader({ request, params }) {
  const user = getFromStorage("userInfo");
  const userId = user.userId;
  const response = await api.get(API_PATHS.GET_ORDERS_USER(userId));
  if (!response) {
    throw json({ message: "Could not fetch events." }, { status: 500 });
  } else {
    const data = await response.data;
    return data.orders;
  }
}
