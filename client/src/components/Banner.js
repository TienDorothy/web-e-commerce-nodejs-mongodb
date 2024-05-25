import React from 'react';
import bannerImg from '../asset/banner1.jpg';
import { Link } from 'react-router-dom';
import Button from '../UI/Button';
const Banner = () => {
  return (
    <>
      <section
        id='banner'
        className='container bg-no-repeat md:bg-cover md:bg-center  flex justify-start items-center w-full'
        style={{ backgroundImage: `url(${bannerImg})` }}
      >
        <div className='uppercase italic  ml-10 py-40'>
          <p className='text-gray-500'>new inspiration 2020</p>
          <p className='text-4xl py-3'>20% off on new season</p>
          <Link to='shop'>
            <Button>Browse collections</Button>
          </Link>
        </div>
      </section>
    </>
  );
};

export default Banner;
