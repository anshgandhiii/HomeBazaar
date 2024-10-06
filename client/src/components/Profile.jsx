import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Edit2, Save } from 'lucide-react';

const Input = ({ label, value, onChange, icon: Icon, placeholder }) => (
  <div className="relative">
    <label className="text-sm font-medium text-gray-600 mb-1 block">{label}</label>
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        placeholder={placeholder}
      />
      <Icon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
    </div>
  </div>
);

const Button = ({ onClick, children, icon: Icon, primary = false }) => (
  <button
    onClick={onClick}
    className={`flex items-center justify-center px-4 py-2 rounded-md transition duration-200 ease-in-out ${
      primary ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
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
    age: '',
    gender: '',
    state: ''
  });

  useEffect(() => {
    // Fetch consumer profile data
    console.log(localStorage.getItem('user'))
    fetch('http://127.0.0.1:8000/api/user/profile/', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('user')}`,
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          setUser({
            name: data.user.name, 
            email: data.user.email,
            phone: data.phone_number,
            location: data.shipping_address,
            age: data.age,
            gender: data.gender,
            state: data.state
          });
        }
      });
  }, []);

  const handleChange = (field) => (e) => {
    setUser({ ...user, [field]: e.target.value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const saveChanges = () => {
    // Save the updated profile data
    fetch('http://127.0.0.1:8000/api/user/consumer/', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${document.cookie.accesss('token')}`, // Ensure user is authenticated
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phone_number: user.phone,
        shipping_address: user.location,
        age: user.age,
        gender: user.gender,
        state: user.state
      })
    })
      .then(response => response.json())
      .then(data => {
        if (!data.error) {
          console.log('Profile updated successfully:', data);
          setIsEditing(false);
        } else {
          console.error('Error updating profile:', data);
        }
      });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">User Profile</h1>
        <Button onClick={isEditing ? saveChanges : toggleEdit} icon={isEditing ? Save : Edit2} primary={isEditing}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
            <p className="text-gray-500">{user.location}</p>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <Input
            label="Full Name"
            value={user.name}
            onChange={handleChange('name')}
            icon={User}
            placeholder="Amit Sharma"
            disabled
          />
          <Input
            label="Email"
            value={user.email}
            onChange={handleChange('email')}
            icon={Mail}
            placeholder="amit.sharma@example.com"
            disabled
          />
          <Input
            label="Phone"
            value={user.phone}
            onChange={handleChange('phone')}
            icon={Phone}
            placeholder="9876543210"
          />
          <Input
            label="Location"
            value={user.location}
            onChange={handleChange('location')}
            icon={MapPin}
            placeholder="Mumbai, India"
          />
        </div>
      </div>
    </div>
  );
};

export default UserProfilePage;
