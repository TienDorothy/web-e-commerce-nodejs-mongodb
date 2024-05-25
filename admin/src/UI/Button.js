import React from 'react';

const Button = props => {
  return (
    <button
      className={`btn rounded-none hover:bg-orange-500 hover:border-orange-500 hover:text-black  font-light ${props.className}`}
      onClick={props.onClick}
      type={'text' || props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
