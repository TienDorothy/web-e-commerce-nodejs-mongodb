import React from "react";
import ProductForm from "../components/ProductForm";

export default function ProdNewPage() {
  const initialValues = {
    name: "",
    category: "",
    short_desc: "",
    long_desc: "",
    price: 0,
    stock: 0,
    img1: null,
    img2: null,
    img3: null,
    img4: null,
  };
  return (
    <>
      <ProductForm initialValues={initialValues} type={'new'}/>
    </>
  );
}
