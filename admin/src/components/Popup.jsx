import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { popupActions } from '../store/popupSlice';
import { PriceFormat } from '../UI';

import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useNavigate } from 'react-router';
const Popup = props => {
  // get value from store-popupSlice
  const isShowPopup = useSelector(state => state.popup.isShowPopup);
  const data = useSelector(state => state.popup.data);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const viewDetailHandler = () => {
    navigate(`/detail/${data._id}`);
  };
  const clickCloseHandler = () => {
    dispatch(popupActions.HIDE_POPUP());
  };
  return (
    <>
      {isShowPopup && (
        <section
          id='popup'
          className='fixed top-0 left-0 bg-[rgba(0,0,0,0.3)] w-full h-screen z-0 flex-c-c animate-fade-down animate-duration-500 '
        >
          {/* popup content */}
          <div className='popup bg-white w-5/6 lg:w-2/3 mt-4 p-4 md:p-8 flex flex-col gap-2'>
            <button
              className='btn btn-circle btn-outline place-self-end'
              onClick={clickCloseHandler}
            >
              X
            </button>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <img src={data.img1} alt={data.name} />

              <div className='italic flex flex-col space-y-3'>
                <h3 className='font-medium '>{data.name}</h3>
                <p className='text-gray-500'>
                  <PriceFormat price={data.price} /> VND
                </p>
                <p>{data.short_desc}</p>
                <button
                  className='btn rounded-none w-1/2 mt-4'
                  onClick={viewDetailHandler}
                >
                  <AiOutlineShoppingCart
                    className='inline-block mr-3'
                    color='white'
                  />
                  View Detail
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Popup;
