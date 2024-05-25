import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { productListActions } from '../store/productListSlice';

const sidleBar = [
  { id: 0, title: 'iphone & mac', items: ['IPhone', 'Ipad', 'Macbook'] },
  { id: 1, title: 'wireless', items: ['Airpod', 'Watch'] },
  { id: 2, title: 'other', items: ['Mouse', 'Keyboard', 'Other'] },
];
const SidleBar = () => {
  // action to productList (store)
  const dispatch = useDispatch();
  // open close for mobile
  const [windowSize, setWindowSize] = useState(768);
  const [isOpen, setIsOpen] = useState(true);
  // let [open, setOpen] = useState(true);

  // Responsive
  // useEffect(() => {
  //   function handleWindowResize() {
  //     setWindowSize(window.innerWidth);
  //   }
  //   window.addEventListener('resize', handleWindowResize);
  //   // for screen tablet , laptop
  //   if (windowSize >= 768) setIsOpen(true);
  //   else setIsOpen(false);

  //   return () => {
  //     window.removeEventListener('resize', handleWindowResize);
  //   };
  // }, [windowSize]);

  const toggleSidleBar = () => {
    setIsOpen(!isOpen);
  };
  // responsive --end--
  return (
    <div id='sidleBar' className='italic '>
      <div
        className='btn btn-active btn-ghost rounded-full mb-4 md:hidden'
        onClick={toggleSidleBar}
      >
        Categories
      </div>
      <div className={`${isOpen ? 'hidden' : ''}  md:block`}>
        <p className='title uppercase bg-black text-gray-300 p-3'>apple</p>
        <div className='p-3'>
          <button
            className='focus:text-second'
            onClick={() => dispatch(productListActions.setCategory('all'))}
          >
            All
          </button>
        </div>
        {sidleBar.map(items => (
          <Fragment key={items.id}>
            <p className='title uppercase bg-bgPrimary  p-3'>{items.title}</p>
            {items.items.map((item, index) => (
              <p key={index} className='p-3'>
                <button
                  className='focus:text-second'
                  onClick={() => dispatch(productListActions.setCategory(item))}
                >
                  {item}
                </button>
              </p>
            ))}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default SidleBar;
