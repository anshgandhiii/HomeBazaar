import React, { useState } from 'react';
import { Search, ShoppingCart, User, Menu, BinocularsIcon } from 'lucide-react';
import { Outlet, Link } from 'react-router-dom';
import Translate from '../Translate';

const categories = ['Handicrafts', 'Food', 'Toys', 'Fashion', 'Accessories', 'Furniture', 'Other'];

function Header() { 
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Mobile Menu Icon */}
          <Menu className="mr-4 cursor-pointer md:hidden" />

          {/* Brand / Logo */}
          <Link to="home" className="mr-4 cursor-pointer">
            <h1 className="text-2xl font-bold">MyShop</h1>
          </Link>

          {/* Translate Button */}
          <button onClick={toggleModal} className="flex justify-start items-center">
            <BinocularsIcon className="h-4 w-4 mr-2" />
          </button>
        </div>

        {/* Search Bar for larger screens */}
        <div className="hidden md:flex items-center flex-grow mx-4">
          <input
            type="text"
            placeholder="Search products..."
            className="w-full p-2 rounded text-gray-800"
          />
          <Search className="ml-2 cursor-pointer" />
        </div>

        {/* Cart and Profile Links */}
        <div className="flex items-center">
          <Link to="cart" className="mr-4 cursor-pointer">
            <ShoppingCart />
          </Link>
          <Link to="profile" className="cursor-pointer">
            <User />
          </Link>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm modal-overlay">
          <div className="modal modal-open">
            <div className="modal-box relative">
              <button onClick={toggleModal} className="absolute right-2 top-2 btn btn-sm btn-circle">✕</button>
              <h2 className="text-lg font-bold">Translation</h2>
              {/* Render the Translate component inside the modal */}
              <Translate />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

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
    <Outlet />
  </>
);

export default Navbar;
