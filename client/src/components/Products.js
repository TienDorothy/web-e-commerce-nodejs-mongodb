import React from 'react';
import ProductItem from './ProductItem';
import { popupActions } from '../store/popupSlice';
import { useDispatch, useSelector } from 'react-redux';
import { productListSelector } from '../store/productListSlice';
const Products = () => {
  const products = useSelector(productListSelector.productList);
  // add action and value to  popupSlice >> open Popup
  const dispatch = useDispatch();
  const getItemOnClick = product => {
    dispatch(popupActions.SHOW_POPUP(product));
  };
  return (
    <>
      <section id='products' className='container'>
        <div className='flex flex-col italic uppercase'>
          <p className='text-gray-500'>made the hard way</p>
          <h2>top trending products</h2>
        </div>
        <div className='grid grid-cols-2 md:grid-cols-4 grid-rows-2 gap-4'>
          {products.length &&
            products.map((product, i) => (
              <ProductItem
                key={i}
                product={product}
                getItemOnClick={getItemOnClick}
              />
            ))}
        </div>
      </section>
    </>
  );
};

export default Products;
