import React from 'react';

const Header = props => {
  return (
    <>
      <div
        id='header'
        className='bg-bgPrimary mt-6 mb-4 italic uppercase h-40 md:h-60 flex-b-c px-10'
      >
        <h1>{props.title}</h1>
        <div className='text-lg'>{props.children}</div>
      </div>
    </>
  );
};

export default Header;
