import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Folder, FileText, BarChart, User, NotebookIcon, Atom, BinocularsIcon } from 'lucide-react';
import Translate from '../Translate';

const SellerNav = () => {
  const location = useLocation();
  const path = location.pathname;
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <nav className="hidden md:flex w-[14%] flex-col justify-between items-center h-screen fixed left-0 bg-dark shadow-lg pt-6 pb-3">
      {/* Logo and Brand */}
      <Link to="/" className="flex space-x-2 items-center">
        <div className="flex flex-col justify-center space-y-[-6px]">
          <div className="flex">
            <span><Atom className='h-6 text-primary mr-2' /></span>
            <h1 className="text-xl font-semibold font-pop text-primary mb-1 text-center">MarketNest</h1>
          </div>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-col items-center space-y-2 w-[100%] mb-20">
        <div className={`w-[85%] text-primary py-2 px-4 rounded-lg transition duration-100 ${path === '/vendor/home' ? 'bg-primary text-white' : 'hover:bg-gray-700 hover:font-semibold'}`}>
          <Link to="/vendor/dashboard" className='flex justify-start items-center'>
            <span><Home className="h-4 w-4 mr-2" /></span>
            <p className="text-sm font-pop">Dashboard</p>
          </Link>
        </div>

        <div className={`w-[85%] text-primary py-2 px-4 rounded-lg transition duration-100 ${path === '/tasks' ? 'bg-primary text-white' : 'hover:bg-gray-700 hover:font-semibold'}`}>
          <Link to="/vendor/products" className='flex justify-start items-center'>
            <span><NotebookIcon className="h-4 w-4 mr-2" /></span>
            <p className="text-sm font-pop">Products</p>
          </Link>
        </div>

        <div className={`w-[85%] text-primary py-2 px-4 rounded-lg transition duration-100 ${path === '/projects' ? 'bg-primary text-white' : 'hover:bg-gray-700 hover:font-semibold'}`}>
          <Link to="/vendor/orders" className='flex justify-start items-center'>
            <span><Folder className="h-4 w-4 mr-2" /></span>
            <p className="text-sm font-pop">Track Orders</p>
          </Link>
        </div>

        <div className={`w-[85%] text-primary py-2 px-4 rounded-lg transition duration-100 ${path === '/resources' ? 'bg-primary text-white' : 'hover:bg-gray-700 hover:font-semibold'}`}>
          <Link to="/vendor/sales" className='flex justify-start items-center'>
            <span><FileText className="h-4 w-4 mr-2" /></span>
            <p className="text-sm font-pop">Marketing</p>
          </Link>
        </div>

        <div className={`w-[85%] text-primary py-2 px-4 rounded-lg transition duration-100 ${path === '/reports' ? 'bg-primary text-white' : 'hover:bg-gray-700 hover:font-semibold'}`}>
          <Link to="/vendor/customers" className='flex justify-start items-center'>
            <span><BarChart className="h-4 w-4 mr-2" /></span>
            <p className="text-sm font-pop">Customers</p>
          </Link>
        </div>

        {/* Translate Button */}
        <div className={`w-[85%] text-primary py-2 px-4 rounded-lg transition duration-100 hover:bg-gray-700 hover:font-semibold`}>
          <button onClick={toggleModal} className='flex justify-start items-center w-full'>
            {/* <span><Translate className="h-4 w-4 mr-2" /></span> */}
            <span><BinocularsIcon className="h-4 w-4 mr-2" /></span>
            <p className="text-sm font-pop">Translate</p>
          </button>
        </div>
      </div>

      {/* Account Link */}
      <div className={`w-[85%] text-primary py-4 px-6 rounded-lg transition duration-100 ${path === '/account' ? 'bg-primary text-white' : 'hover:bg-gray-700 hover:font-semibold'}`}>
        <Link to="/vendor/account" className='flex justify-start items-center'>
          <span><User className="h-4 w-4 mr-2" /></span>
          <p className="text-sm font-pop">Account</p>
        </Link>
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
    </nav>
  );
};

export default SellerNav;
