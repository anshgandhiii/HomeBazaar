import { Outlet } from 'react-router-dom';
import SellerNav from './vendorComponents/SellerNav';


const Layout = () => {
  return (
    <div>
      <SellerNav/>
      <main>
        <Outlet /> {/* This is where the child components will be rendered */}
      </main>
      <footer>
        {/* You can add a Footer here */}
        <p>© 2024 E-commerce Platform</p>
      </footer>
    </div>
  );
};

export default Layout;
