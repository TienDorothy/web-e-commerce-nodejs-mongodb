import React from 'react';
import CardHover from '../UI/CardHover';

import iPhone from '../asset/product_1.png';
import iMac from '../asset/product_2.png';
import iPad from '../asset/product_3.png';
import iWatch from '../asset/product_4.png';
import airPod from '../asset/product_5.png';

import { Link } from 'react-router-dom';
const imgList = [
  [
    { alt: 'iPhone', src: iPhone },
    { alt: 'iMac', src: iMac },
  ],
  [
    { alt: 'iPad', src: iPad },
    { alt: 'iWatch', src: iWatch },
    { alt: 'airPod', src: airPod },
  ],
];
const Category = () => {
  return (
    <section id='category' className='container'>
      <div className='flex-c-c flex-col italic uppercase pt-3'>
        <p className='text-gray-500'>carefully created collections</p>
        <h2>browse our categories</h2>
      </div>
      {imgList.map((imgArr, i) => (
        <div className='flex-b-c gap-3 py-3' key={i}>
          {imgArr.map((img, i) => (
            <Link to='shop' key={i}>
              <CardHover src={img.src} alt={img.alt} />
            </Link>
          ))}
        </div>
      ))}
    </section>
  );
};

export default Category;
