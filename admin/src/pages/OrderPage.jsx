import React, { useEffect, useState } from "react";

import TableOrder from "../components/TableOrder";
import sendRequest from "../api/sendRequest";
import { API_PATHS } from "../api/apiPath";
import { useDispatch, useSelector } from "react-redux";
import { orderActions, orderSelector } from "../store/ordersSlice";
import { searchSelector } from "../store/searchSlice";
import { useNavigate } from "react-router";

export default function OrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orderResult = useSelector(orderSelector.orderResult);
  const search = useSelector(searchSelector.search);

  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const response = await sendRequest("get", API_PATHS.GET_ORDERS);
      const dataFetch = response.data;
      dispatch(orderActions.setOrders(dataFetch.orders));
    } catch (error) {
      navigate("/login");
    }

    setIsLoading(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Search By Name or Id
  useEffect(() => {
    dispatch(orderActions.search(search));
  }, [search]);
  return (
    <>
      <h1>Orders</h1>
      {isLoading ? <p>Loading....</p> : <TableOrder data={orderResult} />}
    </>
  );
}
