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
    <nav className="hidden md:flex w-[14%] flex-col justify-between items-center h-screen fixed left-0 bg-base-100 shadow-lg py-4 dark:bg-base-200">
      {/* Logo and Brand */}
      <Link to="/" className="flex space-x-2 items-center mb-6">
        <div className="flex flex-col justify-center space-y-[-6px]">
          <div className="flex items-center">
            <Atom className='h-6 text-primary mr-2' />
            <h1 className="text-xl font-semibold font-pop text-primary mb-1 text-center">MarketNest</h1>
          </div>
        </div>
      </Link>

      {/* Navigation Links */}
      <div className="flex flex-col items-center space-y-2 w-[100%] mb-20">
        <NavItem to="/vendor/dashboard" icon={<Home className="h-4 w-4 mr-2" />} text="Dashboard" currentPath={path} />
        <NavItem to="/vendor/products" icon={<NotebookIcon className="h-4 w-4 mr-2" />} text="Products" currentPath={path} />
        <NavItem to="/vendor/orders" icon={<Folder className="h-4 w-4 mr-2" />} text="Track Orders" currentPath={path} />
        <NavItem to="/vendor/sales" icon={<FileText className="h-4 w-4 mr-2" />} text="Marketing" currentPath={path} />
        <NavItem to="/vendor/customers" icon={<BarChart className="h-4 w-4 mr-2" />} text="Customers" currentPath={path} />

        {/* Translate Button */}
        <div className="w-[85%] py-2 px-4 rounded-lg transition duration-100 hover:bg-base-300 hover:font-semibold dark:hover:bg-base-700">
          <button onClick={toggleModal} className='flex justify-start items-center w-full text-gray-700 dark:text-gray-200'>
            <BinocularsIcon className="h-4 w-4 mr-2" />
            <p className="text-sm font-pop">Translate</p>
          </button>
        </div>
      </div>

      {/* Account Link */}
      <NavItem to="/vendor/account" icon={<User className="h-4 w-4 mr-2" />} text="Account" currentPath={path} />

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-sm modal-overlay">
          <div className="modal modal-open">
            <div className="modal-box relative">
              <button onClick={toggleModal} className="absolute right-2 top-2 btn btn-sm btn-circle">✕</button>
              <h2 className="text-lg font-bold">Translation</h2>
              <Translate />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const NavItem = ({ to, icon, text, currentPath }) => (
  <div className={`w-[85%] py-2 px-4 rounded-lg transition duration-100 ${
    currentPath === to 
      ? 'bg-primary text-white' 
      : 'hover:bg-base-300 hover:font-semibold dark:hover:bg-base-700'
  }`}>
    <Link to={to} className='flex justify-start items-center'>
      {icon}
      <p className={`text-sm font-pop ${
        currentPath === to 
          ? 'text-white' 
          : 'text-gray-700 dark:text-gray-200'
      }`}>
        {text}
      </p>
    </Link>
  </div>
);

export default SellerNav;