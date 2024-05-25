import React from 'react';
import Navbar from '../components/Navbar';
import LeftSidebar from '../components/LeftSideBar';
const ErrorPage = () => {
  return (
    <div className="flex h-screen bg-gray-100">
    <LeftSidebar />

    <div className="flex flex-col flex-1 overflow-y-auto">
      <Navbar />
      <main className="p-4 flex flex-col gap-6" >
        <h2>Some thing wrong</h2>
      </main>
    </div>
  </div>
  );
};

export default ErrorPage;
