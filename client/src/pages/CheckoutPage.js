import React, { useState } from "react";
import { layout } from "../style";
import { useDispatch, useSelector } from "react-redux";

import { Header } from "../components";
import { Button, PriceFormat } from "../UI";

import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { getFromStorage } from "../store/setLocalStorage";

import { API_PATHS } from "../api/apiPath";
import sendRequest from "../api/sendRequest";
import { cartActions } from "../store/cartSlice";

const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const listCart = useSelector((state) => state.cart.listCart);
  const totalCart = useSelector((state) => state.cart.totalCart);

  const userInfo = getFromStorage("userInfo");

  const initialValues = {
    fullName: userInfo.fullName,
    email: userInfo.email,
    phone: userInfo.phone,
    address: userInfo.address,
  };

  const formik = useFormik({
    initialValues,
    validationSchema: Yup.object({
      fullName: Yup.string().required("Required fullName"),
      email: Yup.string().required("Required email").email(),
      phone: Yup.string()
        .required("Required phone")
        .min(10, "Phone must be at least 10"),
      address: Yup.string().required("Required address"),
    }),

    onSubmit: async (values) => {
      setLoading(true);

      const cart = listCart.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      const order = {
        userId: userInfo.userId,
        cart: cart,
      };
      try {
        const response = await sendRequest("post", API_PATHS.ADD_ORDER, order);

        if (response.status === 201) {
          alert("Order success!");
          dispatch(cartActions.REMOVE_CART());
          navigate("/");
        }
      } catch (error) {
        alert(error.message);
      }

      setLoading(false);
    },
  });
  return (
    <>
      <section className="container italic">
        <Header title="checkout">
          <Link to={"/"}>home / </Link>
          <Link to={"/cart"}>cart / </Link>
          <Link className="text-gray-500" to={"/checkout"}>
            checkout
          </Link>
        </Header>

        <article id="checkout">
          <h3>BILLING DETAILS</h3>
          <div className={`${layout.containerCart}`}>
            {/* TODO: BILLING DETAILS */}
            <form action="" onSubmit={formik.handleSubmit} className="w-full">
              <div className="form-control flex flex-col gap-2 mt-4 ">
                <label htmlFor="name">FULL NAME</label>
                <input
                  type="text"
                  name="fullName"
                  id="fullName"
                  disabled
                  placeholder="Enter Your Full Name Here!"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                />
                {formik.errors.fullName && (
                  <p className="text-red-500 "> {formik.errors.fullName} </p>
                )}
              </div>

              <div className="form-control flex flex-col gap-2 mt-4">
                <label htmlFor="email">EMAIL</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  disabled
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.errors.email && (
                  <p className="text-red-500 "> {formik.errors.email} </p>
                )}
              </div>

              <div className="form-control flex flex-col gap-2 mt-4">
                <label htmlFor="phone">PHONE NUMBER</label>
                <input
                  type="text"
                  name="phone"
                  id="phone"
                  placeholder="Enter Your Phone Number Here!"
                  disabled
                  onChange={formik.handleChange}
                  value={formik.values.phone}
                />
                {formik.errors.phone && (
                  <p className="text-red-500 "> {formik.errors.phone} </p>
                )}
              </div>

              <div className="form-control flex flex-col gap-2 mt-4">
                <label htmlFor="address">ADDRESS</label>
                <input
                  type="text"
                  name="address"
                  id="address"
                  placeholder="Enter Your Address Here!"
                  disabled
                  onChange={formik.handleChange}
                  value={formik.values.address}
                />
                {formik.errors.address && (
                  <p className="text-red-500 "> {formik.errors.address} </p>
                )}
              </div>
              <div className="form-action mt-6">
                <Button>{loading ? "Loading....." : "Place order"}</Button>
              </div>
            </form>
            {/* TODO: YOUR ORDER*/}
            <div className={`${layout.boxCart}`}>
              <h3>YOUR ORDER</h3>
              {/* list cart */}
              {listCart &&
                listCart.map((item, index) => (
                  <p key={index} className="flex-b-c border-b border-gray-400">
                    <span className="font-semibold text-sm">
                      {item.product.name}
                    </span>
                    <span className="text-gray-500 text-sm">
                      <PriceFormat price={item.product.price} /> VND x{" "}
                      {item.quantity}
                    </span>
                  </p>
                ))}

              {/* total cart */}
              <p className="flex-b-c">
                <span className="font-semibold  mr-4">TOTAL </span>
                <span className="text-gray-500 text-md">
                  <PriceFormat price={totalCart ? totalCart : 0} /> VND
                </span>
              </p>
            </div>
          </div>
        </article>
      </section>
    </>
  );
};

export default CheckoutPage;
