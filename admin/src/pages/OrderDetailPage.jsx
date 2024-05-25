import React, { useState } from "react";
import { useEffect } from "react";
import { useParams } from "react-router";
import sendRequest from "../api/sendRequest";
import { API_PATHS } from "../api/apiPath";
import { PriceFormat } from "../UI";
import { BsCurrencyDollar, BsPersonCircle, BsTruck } from "react-icons/bs";
import CardInfo from "../components/CardInfo";
import Table from "../components/Table";
//

const tableName = [
  { th: "id product", td: "_id" },
  { th: "name", td: "product", td_sub: "name" },
  { th: "image", td: "product", td_sub: "img1", type:'img' },
  { th: "category", td: "product", td_sub: "category" },
  { th: "price", td: "product", td_sub: "price", type: "price" },
  { th: "quantity", td: "quantity" },
];

////////////////////
export default function OrderDetailPage() {
  const { orderId } = useParams();
  const [data, setData] = useState();
  const info = [
    {
      digit: data?.userId.fullName,
      name: "User name",
      icon: <BsPersonCircle />,
    },
    {
      digit: <PriceFormat price={data?.total} />,
      type: "price",
      unit: "VND",
      name: "Total Order",
      icon: <BsCurrencyDollar />,
    },
    { digit: data?.delivery, name: "Delivery", icon: <BsTruck /> },
  ];

  const loadData = async () => {
    const res = await sendRequest("get", API_PATHS.GET_ORDER_BY_ID(orderId));
    setData(res.data.order);
  };
  useEffect(() => {
    loadData();
  }, [orderId]);
  
  return (
    <>
      {data && (
        <div className="flex flex-col gap-6">
          <h1>Order detail: {orderId}</h1>
          <CardInfo info={info} />
          <Table tableName={tableName} dataList={data.products} />
        </div>
      )}
    </>
  );
}
