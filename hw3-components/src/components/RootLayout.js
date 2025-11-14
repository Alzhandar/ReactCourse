import React from 'react';
import { Outlet } from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/components/RootLayout.css';

const RootLayout = () => {
  return (
    <div className="root-layout">
      <NavBar />
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;