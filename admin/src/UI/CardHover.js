import React from 'react';

const CardHover = ({ src, alt }) => {
  return (
    <>
      <img src={src} alt={alt} className='hover:opacity-70 cursor-pointer' />
    </>
  );
};

export default CardHover;
