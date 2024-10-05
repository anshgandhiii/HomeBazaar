import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Login from './login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './signup';
import SellerDashboard from './vendorComponents/SellerDashboard';
import SellerHome from './vendorComponents/SellerHome'
import Layout from './Layout';
import Layout from './components/Layout';
import Home from './components/home/Home';
import Freq from './components/home/Freq';



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
    <div className="App">
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />

           </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          

          {/* Seller Routes with Layout */}
          <Route path="/vendor" element={<Layout />}>
            {/* Nested routes will be rendered inside the Layout */}
            <Route path="home" element={<SellerHome />} />
            <Route path="dashboard" element={<SellerDashboard />} />
          </Route>
        </Routes>
      </Router>
      
    </div>
    )
   };
export default App;
