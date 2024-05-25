import React from 'react';

import bannerImg from '../asset/banner1.jpg';

const SignBackground = props => {
  return (
    <>
      <section
        id='login'
        className='container flex justify-center items-start bg-cover bg-center w-full h-screen '
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        {props.children}
      </section>
    </>
  );
};
export default SignBackground;
