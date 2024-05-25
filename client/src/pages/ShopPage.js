import React from 'react';
import { Header, SidleBar, ProductList } from '../components';

const ShopPage = () => {
  // ------------------ ///
  return (
    <section id='shop' className='container'>
      <Header title='shop' children='shop' />
      <div className=' grid grid-cols-1 md:grid-cols-[1fr_3fr] gap-4'>
        <SidleBar />
        <ProductList />
      </div>
    </section>
  );
};

export default ShopPage;
