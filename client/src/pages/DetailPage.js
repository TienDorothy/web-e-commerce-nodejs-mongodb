import React, { useEffect, useState } from "react";
import { useNavigate, useParams, useRouteLoaderData } from "react-router";
import PriceChange from "../UI/PriceFormat";
import Button from "../UI/Button";
import { ProductItem, QuantityForm } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { cartActions, cartSelector } from "../store/cartSlice";
import { loginSelector } from "../store/loginSlice";
import { productListSelector } from "../store/productListSlice";

const DetailPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLogin = useSelector(loginSelector.isLogin);
  const stock = useSelector(cartSelector.stock);
  // get id from url
  const { productId } = useParams();

  // find product by productId
  const data = useRouteLoaderData("root");
  let product = data?.find((item) => item._id === productId);
  console.log('data', data)
  let longDesc, relatedProducts;
  if (product) {
    longDesc = product.long_desc?.split("\n");
    relatedProducts = data.filter(
      (item) => item.category === product.category && item._id !== productId
    );
  }

  const [quantity, setQuantity] = useState(1);
  const [key, setKey] = useState(0);

  const getQuantity = (quantity) => setQuantity(quantity);

  const cartSubmit = () => {
    if (!isLogin) {
      return alert("You have to login");
    }

    let item = {
      product: {
        _id: product._id,
        name: product.name,
        img1: product.img1,
        price: parseInt(product.price),
        stock: product.stock,
      },
      quantity: parseInt(quantity),
    };
    console.log("add to cart", item);

    dispatch(cartActions.ADD_CART(item));
    dispatch(cartActions.CHECK_STOCK(product));

    alert(`Add ${quantity} ${product.name} to Your Cart.`);
  };

  // go to detailPage - RELATED PRODUCTS
  const getItemOnClick = (product) => {
    navigate(`/detail/${product._id}`);
  };

  // reset QuantityForm
  useEffect(() => {
    setKey((pre) => pre + 1); // render Quantity form

    dispatch(cartActions.CHECK_STOCK(product));
  }, [productId]);
  return (
    <>
      {product && (
        <section id="detail" className="container italic">
          <div className="flex gap-4 flex-wrap md:flex-nowrap  ">
            {/* img */}
            <div className="img grid grid-cols-[1fr_4fr] content-stretch gap-4 md:flex-1">
              <div className="imgList flex flex-col ">
                <img src={product.img1} alt="" />
                <img src={product.img2} alt="" />
                <img src={product.img3} alt="" />
                <img src={product.img4} alt="" />
              </div>
              <div>
                <img src={product.img1} alt="" />
              </div>
            </div>
            {/* content */}
            <div className="description flex flex-col gap-3 md:flex-1">
              <h2>{product.name}</h2>
              <p className="text-lg text-gray-500">
                <PriceChange price={product.price} /> VND
              </p>
              <p>{product.short_desc}</p>
              <p>
                <strong>CATEGORY:</strong>
                {product.category}
              </p>

              {/* Check stock product */}
              {product?.stock < 1 ? (
                <h3 className="p-4 bg-neutral-200 text-center">
                  Product not available
                </h3>
              ) : (
                <div className="cart flex items-stretch">
                  <div className="input-group">
                    <div className="flex-b-c gap-4 border-gray-400 border">
                      <p className="text-gray-400 p-2">QUANTITY</p>
                      <QuantityForm
                        onSubmit={getQuantity}
                        key={key}
                        stock={product?.stock}
                        // stock={stock}
                      />
                    </div>

                    <Button onClick={cartSubmit}>Add to cart</Button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 mb-9  flex flex-col items-start gap-3">
            <Button>DESCRIPTION</Button>
            <h3>PRODUCT DESCRIPTION</h3>
            <div className="longDesc mt-5">
              {longDesc.map((item, index) => (
                <p key={index}>{item}</p>
              ))}
            </div>
          </div>
          <div className="relative">
            <h3>RELATED PRODUCTS</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4">
              {relatedProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  product={item}
                  getItemOnClick={getItemOnClick}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default DetailPage;
