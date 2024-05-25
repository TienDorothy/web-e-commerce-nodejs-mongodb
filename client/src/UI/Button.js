import React from 'react';

const Button = props => {
  return (
    <button
      className={`btn rounded-none hover:bg-second hover:border-second  hover:text-neutral-800 font-light ${props.className}`}
      onClick={props.onClick}
      type={'text' || props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
