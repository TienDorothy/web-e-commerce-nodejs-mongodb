import React from 'react';
import { Navbar } from '../components';
const ErrorPage = () => {
  return (
    <div className='container'>
      <Navbar />
      <h2 className='text-center bg-neutral text-neutral-content p-4'>
        Something wrong
      </h2>
    </div>
  );
};

export default ErrorPage;
