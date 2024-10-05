import { useEffect, useState } from 'react';
import './App.css';
import Login from './login';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from './signup';
import SellerDashboard from './vendorComponents/SellerDashboard';
import SellerHome from './vendorComponents/SellerHome'

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
      <div className="App">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          {/* Seller Routes */}
          <Route path="/vendor/home" element={<SellerHome />} />
          <Route path="/vendor/dashboard" element={<SellerDashboard />} />
        </Routes>
      </div>
    </Router>
    </div>
  );
}

export default App;
