import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const footerLinks = [
    {
      id: 0,
      title: 'customer services',
      links: [
        'Helps & Contact Us',
        'Returns & Refunds',
        'Online Stores',
        'Terms & Conditions',
      ],
    },
    {
      id: 1,
      title: 'company',
      links: ['What We Do', 'Available Services', 'Latest Posts', 'FAQs'],
    },
    {
      id: 2,
      title: 'social media',
      links: ['Twitter', 'Instagram', 'Facebook', 'Pinterest'],
    },
  ];
  return (
    <>
      <footer className='bg-neutral-800 mt-auto'>
        <div className='container footer p-10 text-neutral-content italic grid grid-cols-2 md:grid-cols-3'>
          {footerLinks &&
            footerLinks.map((link, index) => (
              <div key={index}>
                <p className='text-xl uppercase mb-3 text-white'>
                  {link.title}
                </p>
                {link.links.map((link, i) => (
                  <ul key={i} className='text-gray-500'>
                    <li className='link link-hover'>
                      <Link to=''>{link}</Link>
                    </li>
                  </ul>
                ))}
              </div>
            ))}
        </div>
      </footer>
    </>
  );
};

export default Footer;
