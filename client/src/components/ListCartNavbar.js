import React from 'react';
import { useSelector } from 'react-redux';
import { PriceFormat } from '../UI';

const ListCartNavbar = () => {
  const listCart = useSelector(state => state.cart.listCart);
  return (
    <>
      {listCart.map((item, index) => (
        <div
          className='grid grid-cols-[1fr_4fr_1fr] gap-4 items-center justify-items-center italic text-sm'
          key={index}
        >
          <img src={item.img} alt='' />
          <div className='font-bold text-center '>{item.name}</div>
          <div className=' text-center'>
            <p>
              <PriceFormat price={item.price} />
            </p>
            <p>VND</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default ListCartNavbar;
