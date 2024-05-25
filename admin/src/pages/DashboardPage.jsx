import React, { useEffect, useState } from "react";

import CardInfo from "../components/CardInfo";
import TableOrder from "../components/TableOrder";
import { PriceFormat } from "../UI";

import { API_PATHS } from "../api/apiPath";
import { useNavigate } from "react-router";
import { HiOutlineUserAdd } from "react-icons/hi";
import {
  BsCurrencyDollar,
  BsCurrencyExchange,
  BsFileEarmarkDiff,
} from "react-icons/bs";
import sendRequest from "../api/sendRequest";
import { useDispatch, useSelector } from "react-redux";
import { orderActions, orderSelector } from "../store/ordersSlice";
import { searchSelector } from "../store/searchSlice";
import { loginSelector } from "../store/loginSlice";

/////
export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const search = useSelector(searchSelector.search);
  const isAdmin = useSelector(loginSelector.isAdmin);
  const orderResult = useSelector(orderSelector.orderResult);

  const [data, setData] = useState(null);

  const info = [
    { digit: data?.countClients, name: "Clients", icon: <HiOutlineUserAdd /> },
    {
      digit: <PriceFormat price={data?.totalMonth} />,
      type: "price",
      unit: "VND",
      name: "Earnings of Month",
      icon: <BsCurrencyDollar />,
    },
    {
      digit: <PriceFormat price={data?.totalIncome} />,
      type: "price",
      unit: "VND",
      name: "Total Income",
      icon: <BsCurrencyExchange />,
    },
    {
      digit: data?.countNewOrders,
      name: "New Order",
      icon: <BsFileEarmarkDiff />,
    },
  ];

  const loadData = async () => {
    try {
      const res = await sendRequest("get", API_PATHS.GET_ANALYTICS);
      setData(res.data);
      dispatch(orderActions.setOrders(res.data.newOrders));
    } catch (error) {
      navigate("/login");
    }
  };

  // get data from server
  useEffect(() => {
    if (isAdmin) {
      loadData();
    }
  }, [isAdmin]);

  // Search By Name or Id
  useEffect(() => {
    dispatch(orderActions.search(search));
  }, [search]);

  return (
    <>
      <h1>Dashboard</h1>
      {data && (
        <>
          <CardInfo info={info} />
          <TableOrder data={orderResult} />
        </>
      )}
    </>
  );
}
