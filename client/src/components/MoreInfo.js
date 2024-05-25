import React from 'react';

const MoreInfo = () => {
  return (
    <>
      <section id='moreInfo' className='container'>
        <div className=' bg-bgPrimary italic flex-a-c p-6 md:p-8 '>
          <div className='mr-3 text-center'>
            <p className='uppercase font-medium text-xl md:text-2xl'>
              free shipping
            </p>
            <p className='text-gray-500'>Free shipping worldwide</p>
          </div>
          <div className='mr-3 text-center'>
            <p className='uppercase font-medium text-xl md:text-2xl'>
              24x8 service
            </p>
            <p className='text-gray-500'>Free shipping worldwide</p>
          </div>
          <div className='mr-3 text-center'>
            <p className='uppercase font-medium text-xl md:text-2xl'>
              festival offer
            </p>
            <p className='text-gray-500'>Free shipping worldwide</p>
          </div>
        </div>

        <div className=' mt-4 flex flex-row justify-between flex-wrap gap-2'>
          <div className='italic'>
            <p className='uppercase font-medium text-2xl md:text-3xl'>
              let's be friends!
            </p>
            <p className='text-gray-500'>
              Nisi nisi tempor consequat laboris nisi
            </p>
          </div>
          <form>
            <div className='flex w-1/2 items-stretch'>
              <input
                type='email'
                name='email'
                id='email'
                placeholder='Enter your email address'
              />
              <button className='btn rounded-none'>Subscribe</button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default MoreInfo;
