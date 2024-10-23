import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save, Coins, LogOut, Home } from 'lucide-react';
import axios from 'axios';
import Cookies from 'js-cookie';

const Input = ({ label, value, onChange, icon: Icon, placeholder, readOnly = false }) => (
  <div className="relative">
    <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          readOnly ? 'bg-gray-100 cursor-not-allowed' : ''
        }`}
        placeholder={placeholder}
        readOnly={readOnly}
      />
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    </div>
  </div>
);

const Button = ({ onClick, children, icon: Icon, primary = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 rounded-md transition duration-200 ease-in-out ${
      primary ? 'bg-blue-500 text-base-content hover:bg-blue-600' : 'bg-base-200 text-base-700 hover:bg-base-300'
    }`}
  >
    {Icon && <Icon size={18} className="mr-2" />}
    {children}
  </button>
);

const UserProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    coins: '0',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = Cookies.get('access_token'); // Get access token from cookies
        const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
          headers: {
            Authorization: `Bearer ${token}`, // Add the Bearer token to the Authorization header
          },
        });
        setUser({
          name: response.data.name,
          email: response.data.email,
          phone: response.data.phone_number,
          location: response.data.shipping_address,
          coins: response.data.coins,
          coins: response.data.coins,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleChange = (field) => (e) => {
    if (field === 'phone' && e.target.value.length > 10) return; // restrict to 10 digits
    setUser({ ...user, [field]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveUserData = async () => {
    try {
      const token = Cookies.get('access_token');
      if (!token) {
        console.error('No access token found.');
        return;
      }

      const updatedData = {
        name: user.name,
        email: user.email,
        phone_number: user.phone,
        shipping_address: user.location,
      };
  
      await axios.post('http://127.0.0.1:8000/api/user/consumers/', updatedData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      console.log('User data saved successfully');
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleLogout = () => {
    Cookies.remove('access_token');
    window.location.href = '/';
  };

  const goToHome = () => {
    window.location.href = '/consumer/home';
  };

  const goToRewards = () => {
    window.location.href = '/consumer/rewards';
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-base-200 rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-base-content">User Profile</h1>
        <div className="flex space-x-4">
          <Button onClick={goToHome} icon={Home} primary={false}>
            Home
          </Button>
          <Button onClick={goToRewards} icon={Coins} primary={false}>
            Rewards
          </Button>
          <Button onClick={goToRewards} icon={Coins} primary={false}>
            Rewards
          </Button>
          <Button onClick={handleLogout} icon={LogOut} primary={false}>
            Logout
          </Button>
          <Button onClick={isEditing ? saveUserData : toggleEdit} icon={isEditing ? Save : Edit2} primary={isEditing}>
            {isEditing ? 'Save Changes' : 'Edit Profile'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-base-content">{user.name}</h2>
            <p className="text-base-content">{user.location}</p>
            <h2 className="text-xl font-semibold text-base-content">{user.name}</h2>
            <p className="text-base-content">{user.location}</p>
            <div className="flex justify-center items-center mt-4">
              <Coins className="text-yellow-500 mr-2" size={20} />
              <span className="text-lg font-medium text-base-content">{user.coins} Coins</span>
              <span className="text-lg font-medium text-base-content">{user.coins} Coins</span>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Input label="Full Name" value={user.name} onChange={handleChange('name')} icon={User} placeholder="Amit Sharma" />
          <Input label="Email" value={user.email} onChange={handleChange('email')} icon={Mail} placeholder="" />
          <Input label="Phone" value={user.phone} onChange={handleChange('phone')} icon={Phone} placeholder="" />
          <Input label="Location" value={user.location} onChange={handleChange('location')} icon={MapPin} placeholder="" />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;