import React, { useState } from "react";
import { useParams } from "react-router";
import ProductForm from "../components/ProductForm";
import { useDispatch, useSelector } from "react-redux";
import {
  productListActions,
  productListSelector,
} from "../store/productListSlice";
export default function ProdUpdatePage() {
  const { productId } = useParams();
  const [initValue, setInitValue] = useState({});

  const dispatch = useDispatch();
  dispatch(productListActions.getProdById(productId));

  const prod = useSelector(productListSelector.productById);
  const initialValues = {
    name: prod.name,
    category: prod.category,
    short_desc: prod.short_desc,
    long_desc: prod.long_desc,
    price: prod.price,
    stock: prod.stock,
    img1: prod.img1,
    img2: prod.img2,
    img3: prod.img3,
    img4: prod.img4,
  };
  return (
    <div>
      <ProductForm initialValues={initialValues} type="update" prodId={productId} />
    </div>
  );
}
