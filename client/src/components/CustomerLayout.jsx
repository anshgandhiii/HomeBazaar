import React from 'react';
import { Search, ShoppingCart, User, Menu } from 'lucide-react';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

const categories = ['Handicrafts', 'Food', 'Toys', 'Fashion', 'Accessories', 'Furniture', 'Other'];

const Header = () => (
  <header className="bg-blue-600 text-white p-4">
    <div className="container mx-auto flex justify-between items-center">
      <div className="flex items-center">
        <Menu className="mr-4 cursor-pointer md:hidden" />
        <Link to="home" className="mr-4 cursor-pointer">
        <h1 className="text-2xl font-bold">MyShop</h1>
      </Link>
      </div>
      <div className="hidden md:flex items-center flex-grow mx-4">
        <input
          type="text"
          placeholder="Search products..."
          className="w-full p-2 rounded text-gray-800"
        />
        <Search className="ml-2 cursor-pointer" />
      </div>
      <div className="flex items-center">
        
      <Link to="cart" className="mr-4 cursor-pointer">
        <ShoppingCart  />
      </Link>
      <Link to="profile" className="mr-4 cursor-pointer">
        <User className="cursor-pointer" />
      </Link>
      </div>
    </div>
  </header>
);

const CategoryNav = () => (
  <nav className="bg-gray-100 p-4">
    <div className="container mx-auto">
      <ul className="flex justify-between overflow-x-auto">
        {categories.map((category) => (
          <li key={category} className="mx-2 whitespace-nowrap">
            <a href="#" className="text-gray-700 hover:text-blue-600">{category}</a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const Navbar = () => (
  <>
    <Header />
    <CategoryNav />
<Outlet></Outlet>
  </>
);

export default Navbar;
