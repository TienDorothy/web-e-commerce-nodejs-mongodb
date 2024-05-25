import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  productListActions,
  productListSelector,
} from "../store/productListSlice";
import { useNavigate } from "react-router";

import api from "../api/api";
import { API_PATHS } from "../api/apiPath";
import sendRequest from "../api/sendRequest";

import Table from "../components/Table";
import { searchSelector } from "../store/searchSlice";

// ------------------ ///
const tableName = [
  { th: "id", td: "_id" },
  { th: "name", td: "name" },
  { th: "price", td: "price", type: "price" },
  { th: "image", td: "img1", type: "img" },
  { th: "category", td: "category" },
  { th: "edit", type: "button", action: ["update", "delete"] },
];
// ------------------ ///

export default function ProdsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const products = useSelector(productListSelector.productResult);
  const search = useSelector(searchSelector.search);

  const handleAction = async (action, prod) => {
    if (action === "update") {
      return navigate(`/products/${prod._id}`);
    }

    const confirmed = window.confirm(
      `Are you sure you want to delete: ${prod.name}`
    );

    if (confirmed) {
      try {
        const res = await api.delete(API_PATHS.DELETE_PRODUCT(prod._id));
        if (res.status === 200) {
          dispatch(productListActions.deleteById(prod._id));
          alert(res.data.message);
        }
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };
  async function loadData() {
    try {
      const res = await sendRequest("get", API_PATHS.GET_PRODUCTS);
      const data = res.data;
      dispatch(productListActions.setProduct(data.products));
    } catch (error) {
      navigate("/login");
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  // Search By Name Product
  useEffect(() => {
    dispatch(productListActions.searchByName(search));
  }, [search]);

  return (
    <>
      <div id="products" className="flex flex-col gap-6">
        <h1>Products</h1>
        {Array.isArray(products) && (
          <Table
            tableName={tableName}
            dataList={products}
            handleAction={handleAction}
          />
        )}
      </div>
    </>
  );
}

// export async function loader() {
//   const response = await api.get(API_PATHS.GET_PRODUCTS);
//   if (!response) {
//     throw json({ message: "Could not fetch events." }, { status: 500 });
//   } else {
//     const data = await response.data;
//     return data.products;
//   }
// }
