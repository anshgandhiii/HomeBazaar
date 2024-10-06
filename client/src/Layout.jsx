import React from 'react';
import { Outlet } from 'react-router-dom';
import SellerNav from './vendorComponents/SellerNav';
import ThemeToggler from './components/Theme'; // Import the ThemeToggler component

const Layout = () => {
  return (
    <div>
      {/* User role-specific navigation */}
      {<SellerNav />}
      {/* You can add a different nav for customers as needed */}

      {/* Theme toggler component */}
      <div className="flex justify-end p-4 bg-base-100 dark:bg-base-900">
        <ThemeToggler />
      </div>

      <main>
        <Outlet /> {/* This is where the child components will be rendered */}
      </main>

      <footer className="text-center p-4 bg-base--200 dark:bg-base-800 text-base-content-700 dark:text-base-content-300">
        <p>© 2024 E-commerce Platform</p>
      </footer>
    </div>
  );
};

export default Layout;
