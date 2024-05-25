import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';

import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa';
import { productListSelector } from '../store/productListSlice';
const ProductList = () => {
  const productsFilter = useSelector(productListSelector.productFilter);
  const getItemOnClick = product => {};
  return (
    <section>
      <div id='productList' className='grid grid-cols-2 md:grid-cols-3 '>
        {productsFilter.length ? (
          productsFilter.map((item, index) => (
            <Link to={`/detail/${item._id}`} key={index}>
              <ProductItem product={item} getItemOnClick={getItemOnClick} />
            </Link>
          ))
        ) : (
          <p>No found product</p>
        )}
      </div>
      {/* pagination  */}
      <div className=' flex items-end flex-col gap-2'>
        <div className='btn-group'>
          <button className='btn btn-outline'>
            <FaAngleDoubleLeft />
          </button>
          <button className='btn'>1</button>
          <button className='btn btn-outline'>
            <FaAngleDoubleRight />
          </button>
        </div>
        {productsFilter.length ? (
          <p className='italic'>
            Showing 1 - {productsFilter.length} of {productsFilter.length}{' '}
            results
          </p>
        ) : null}
      </div>
    </section>
  );
};

export default ProductList;
