import { useEffect, useState } from 'react';
import './App.css';
import Login from './login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './signup';
import SellerDashboard from './vendorComponents/SellerDashboard';
import SellerHome from './vendorComponents/SellerHome'
import Layout from './Layout';
import Home from './components/home/Home';
import CustomerLayout from './components/CustomerLayout';
import Freq from './components/home/Freq';
import SellerProducts from './vendorComponents/SellerProducts';
import SellersOrders from './vendorComponents/SellerOrders';
import SellerSales from './vendorComponents/SellerSales';
import SellerCustomers from './vendorComponents/SellerCustomers';
import Details from './components/Details';
import Product from './components/Product'
import Rewards from './components/Rewards'
import SellerAccount from './vendorComponents/SellerAccount';
import FinalPaymentPage from './components/FinalPaymentPage';
import ShoppingCartPage from './components/ShoppingCartPage';
import UserProfilePage from './components/Profile';
import CategoryPage from './components/Category';
// import Rewards from './components/Rewards'



function App() {
  // const [isAuthenticated, setIsAuthenticated] = useState(false);
  // const [userType, setUserType] = useState(null); // Could be 'seller' or 'customer'

  // useEffect(() => {
  //   // Check if user data exists in localStorage or sessionStorage
  //   const userData = localStorage.getItem('user'); // You can also use sessionStorage
  //   if (userData) {
  //     const parsedUser = JSON.parse(userData);
  //     setIsAuthenticated(true);
  //     setUserType(parsedUser.role); // Assuming userData contains a role field (e.g., 'seller' or 'customer')
  //   }
  // }, []);

  // useEffect(() => {
  //   // Redirect based on userType once authentication status is determined
  //   if (isAuthenticated) {
  //     if (userType === 'seller') {
  //       window.location.href="/seller/home"
  //     } else if (userType === 'customer') {
  //       window.location.href="/home"
  //     }
  //   }
  // }, [isAuthenticated, userType]);

  return (
    <div className="App bg-base">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/consumer" element={<CustomerLayout/>}>
            <Route path="home" element={<Home />} />
            <Route path="details" element={<Details/>} />
            {/* <Route path="rewards" element={<Rewards/>} /> */}
            {/* <Route path="home" element={<Freq />} /> */}
            <Route path="product" element={<Product/>}></Route>
            <Route path="payment" element={<FinalPaymentPage/>}></Route>
            <Route path="cart" element={<ShoppingCartPage/>}></Route>
            <Route path="profile" element={<UserProfilePage/>}></Route>
            <Route path="category" element={<CategoryPage/>}></Route>


           </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          

          {/* Seller Routes with Layout */}
          <Route path="/vendor" element={<Layout />}>
            {/* Nested routes will be rendered inside the Layout */}
            <Route path="home" element={<SellerHome />} />
            <Route path="dashboard" element={<SellerDashboard />} />
            <Route path="products" element={<SellerProducts />} />
            <Route path="orders" element={<SellersOrders />} />
            <Route path="sales" element={<SellerSales />} />
            <Route path="customers" element={<SellerCustomers />} />
            <Route path="account" element={<SellerAccount />} />
          </Route>
        </Routes>
      </Router>
      
    </div>
    )
   };
export default App;
