
import React, { useState } from "react";
import Button from "../UI/Button";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import { API_PATHS } from "../api/apiPath";

const isValidFileType = (value) =>
  value &&
  (value.type === "image/jpeg" ||
    value.type === "image/jpg" ||
    value.type === "image/png" ||
    value.type === "image/gif");

const isValidFileSize = (value) => value && value.size <= 2 * 1024 * 1024;

const imageFieldSchema = (type) => {
  let schema = Yup.mixed();
  if (type === "new") {
    schema = schema
      .test("fileType", "Unsupported file type", isValidFileType)
      .test("fileSize", "Image size should be less than 2MB", isValidFileSize);
  }
  return schema;
};

const inputs = [
  {
    id: "name",
    label: "Product Name",
    type: "text",
    name: "name",
    placeholder: "Enter Product Name",
  },
  {
    id: "short_desc",
    label: "short description",
    type: "text",
    name: "short_desc",
    placeholder: "Enter Short Description",
  },
  {
    id: "long_desc",
    label: "Long description",
    type: "text",
    name: "long_desc",
    placeholder: "Enter Long Description",
  },
  {
    id: "category",
    label: "Category",
    type: "select",
    name: "category",
    options: ["iphone", "ipad", "watch", "airpod"],
  },
  {
    id: "price",
    label: "price",
    type: "number",
    name: "price",
    placeholder: "Enter Price",
  },
  {
    id: "stock",
    label: "stock",
    type: "number",
    name: "stock",
    placeholder: "Enter stock",
  },
  {
    id: "img1",
    label: "Image 1",
    type: "file",
    name: "img1",
  },
  {
    id: "img2",
    label: "Image 2",
    type: "file",
    name: "img2",
  },
  {
    id: "img3",
    label: "Image 3",
    type: "file",
    name: "img3",
  },
  {
    id: "img4",
    label: "Image 4",
    type: "file",
    name: "img4",
  },
];
const inputClass =
  "border border-gray-300 text-gray-900 text-sm  focus:ring-red-400 focus:border-red-400 block w-full p-4";
////////////////////////////////
export default function ProductForm({ initialValues, type = "new", prodId }) {
  const navigate = useNavigate();
  //   Formik
  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Required product name"),
      category: Yup.string().required("Required category"),
      short_desc: Yup.string().required("Required short_desc"),
      long_desc: Yup.string().required("Required long_desc"),
      price: Yup.number()
        .required("Required price")
        .min(10000, "Minimum 10.000"),
      stock: Yup.number().required("Required stock").min(1, "Minimum 1"),
      img1: imageFieldSchema(),
      img2: imageFieldSchema(),
      img3: imageFieldSchema(),
      img4: imageFieldSchema(),
    }),

    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("category", values.category);
      formData.append("short_desc", values.short_desc);
      formData.append("long_desc", values.long_desc);
      formData.append("price", values.price);
      formData.append("stock", values.stock);
      formData.append("image", values.img1);
      formData.append("image", values.img2);
      formData.append("image", values.img3);
      formData.append("image", values.img4);

      const url = type === "new" ? API_PATHS.POST_NEW_PRODUCT : API_PATHS.PUT_UPDATE_PRODUCT(prodId);

      try {
        const res = await api({
          method: type === "new" ? "post" : "put",
          url,
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        
        if (res.status === 201 || res.status === 200) {
          const message = res.status === 201 ? "Create new product success." : "Update product success.";
          alert(message);
          formik.resetForm();
          navigate("/products");
        }
        
      } catch (error) {
        console.log("err new product :>> ", error);
      }
    },
  });

  return (
    <>
      <form
        onSubmit={formik.handleSubmit}
        className="w-full md:w-1/2 mx-auto shadow-lg p-6 rounded-md bg-slate-50"
      >
        <h3 className="text-4xl text-center font-light p-3">
          {type === "new" ? "New" : "Update"} Product
        </h3>
        {inputs.map((input, index) => (
          <div
            key={index}
            className={`form-control mb-4 
            ${type !== "new" && input.type === "file" ? "hidden" : ""}`}
          >
            <label className="capitalize" htmlFor={input.id}>
              {input.label}
            </label>
            {input.type === "select" ? (
              <select
                id={input.id}
                name={input.name}
                className={inputClass}
                onChange={formik.handleChange}
                value={formik.values[input.name]}
              >
                <option value="">Select {input.label}</option>
                {input.options.map((option, optionIndex) => (
                  <option key={optionIndex} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            ) : input.type === "file" ? (
              <input
                type={input.type}
                id={input.id}
                name={input.name}
                className={inputClass}
                multiple={input.multiple}
                onChange={(e) => {
                  formik.setFieldValue(input.name, e.target.files[0]);
                }}
              />
            ) : (
              <input
                type={input.type}
                id={input.id}
                name={input.name}
                placeholder={input.placeholder}
                className={inputClass}
                onChange={formik.handleChange}
                value={formik.values[input.name]}
              />
            )}
            {formik.errors[input.name] && (
              <p className="text-red-500 py-3">{formik.errors[input.name]}</p>
            )}
          </div>
        ))}

        <Button className="w-full mt-4">
          {type === "new" ? "Create" : "Update"}
        </Button>
      </form>
    </>
  );
}
