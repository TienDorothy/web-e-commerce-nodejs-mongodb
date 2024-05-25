import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { layout } from "../style";
import { cartActions } from "../store/cartSlice";

import { Header, QuantityForm } from "../components";

import { Button, PriceFormat } from "../UI";

import { RiDeleteBin5Line, RiGiftLine } from "react-icons/ri";
import { FaLongArrowAltLeft, FaLongArrowAltRight } from "react-icons/fa";
import { loginSelector } from "../store/loginSlice";

// ------------------ ///
const CartPage = () => {
  const dispatch = useDispatch();
  // check login
  const login = useSelector(loginSelector.isLogin);

  // get state from redux
  const listCart = useSelector((state) => state.cart.listCart);
  const totalCart = useSelector((state) => state.cart.totalCart);

  return (
    <>
      <section id="cart" className="container italic">
        <Header title="cart" children="cart" />
        {login && listCart.length !== 0 ? (
          <div id="cart">
            <h3 className="my-4">SHOPPING CART</h3>
            {listCart.length !== 0 && (
              <div className={`${layout.containerCart}`}>
                <div>
                  <div className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 items-center justify-items-center italic bg-bgPrimary md:p-2 lg:p-4">
                    <p>IMAGE</p>
                    <p>PRODUCT</p>
                    <p>PRICE</p>
                    <p>QUANTITY</p>
                    <p>TOTAL</p>
                    <p>REMOVE</p>
                  </div>
                  {/* LIST CART */}
                  {listCart.map((item, index) => (
                    <div
                      className="grid grid-cols-[1fr_1.5fr_1fr_1fr_1fr_1fr] gap-4 items-center justify-items-center italic text-sm"
                      key={index}
                    >
                      <Link to={`/detail/${item.product._id}`}>
                        <img src={item.product.img1} alt="" />
                      </Link>
                      <div className="font-bold text-center ">
                        {item.product.name}
                      </div>
                      <div className="text-gray-500 text-center">
                        <p>
                          <PriceFormat price={item.product.price} />
                        </p>
                        <p>VND</p>
                      </div>
                      <div>
                        <QuantityForm
                          onSubmit={(newQuantity) =>
                            dispatch(
                              cartActions.UPDATE_CART({
                                _id: item.product._id,
                                quantity: newQuantity,
                              })
                            )
                          }
                          inputForm={item.quantity}
                          id={item.id}
                        />
                        {}
                      </div>
                      <div className="text-gray-500 text-center">
                        <p>
                          <PriceFormat
                            price={
                              parseInt(item.product.price) *
                              parseInt(item.quantity)
                            }
                          />
                        </p>
                        <p>VND</p>
                      </div>
                      <button
                        className="hover:text-second"
                        onClick={() =>
                          dispatch(cartActions.DELETE_ITEM(item.product._id))
                        }
                      >
                        <RiDeleteBin5Line />
                      </button>
                    </div>
                  ))}

                  {/*//todo: Navigation */}
                  <div className="bg-bgPrimary px-3 py-4 flex-b-c w-fit md:w-full justify-between items-center italic ">
                    <Link
                      to="/shop"
                      className="p-3 border-none hover:border-black hover:bg-second"
                    >
                      <FaLongArrowAltLeft className="inline-block mr-2" />
                      Continue Shopping
                    </Link>
                    <Link
                      to="/checkout"
                      className="p-3 border border-black hover:bg-second"
                    >
                      Proceed to Checkout
                      <FaLongArrowAltRight className="inline-block ml-2" />
                    </Link>
                  </div>
                </div>

                {/* TOTAL CART */}
                <div className={`${layout.boxCart}`}>
                  <h3>CART TOTAL</h3>
                  <p className="flex-b-c border-b border-gray-400">
                    <span className="font-semibold text-sm">SUBTOTAL</span>
                    <span className="text-gray-500 text-sm">
                      <PriceFormat price={totalCart} /> VND
                    </span>
                  </p>
                  <p className="flex-b-c">
                    <span className="font-semibold  mr-4">TOTAL CART</span>
                    <span className="text-gray-500 text-md">
                      <PriceFormat price={totalCart} /> VND
                    </span>
                  </p>

                  <form action="" className="flex flex-col items-stretch">
                    <input type="text" placeholder="Enter your coupon" />
                    <Button>
                      <RiGiftLine className="inline-block mr-2" />
                      Apply coupon
                    </Button>
                  </form>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link to={"/shop"} className="btn btn-outline">
            Go to Shop
          </Link>
        )}
      </section>
    </>
  );
};

export default CartPage;
