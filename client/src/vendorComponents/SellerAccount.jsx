import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you are using react-router for navigation
import Swal from 'sweetalert2'; // Import SweetAlert2 for confirmation

const SellerAccount = () => {
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    businessName: "Doe's Store",
    email: 'john@example.com',
    city: 'New York',
    state: 'NY',
    businessLink: 'www.doesstore.com',
  });

  const [rewardPoints, setRewardPoints] = useState(320); // Seller's current reward points
  const rewardMilestone = 500; // Next reward milestone
  const navigate = useNavigate(); // For navigation after logout

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Profile updated:', profileData);
  };

  // Calculate progress towards next milestone
  const progressPercentage = Math.min((rewardPoints / rewardMilestone) * 100, 100);

  // Handle logout and remove the access_token cookie
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, log out!',
      cancelButtonText: 'No, stay logged in',
    }).then((result) => {
      if (result.isConfirmed) {
        // Remove the access_token cookie
        document.cookie = 'access_token=; Max-Age=0; path=/; domain=' + window.location.hostname;

        // Redirect to login page
        navigate('/login'); // Assuming '/login' is the route for login
      }
    });
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-base-200 shadow-md rounded-lg relative">
      {/* Logout Button */}
      <div className="absolute top-0 right-0 m-4">
        <button
          onClick={handleLogout}
          className="bg-primary hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          Logout
        </button>
      </div>

      {/* Reward Points Display */}
      <div className="mb-6 bg-base-800 p-4 rounded-lg text-primary text-center">
        <h2 className="text-xl font-bold">Reward Points: {rewardPoints}</h2>
        <div className="w-full bg-base-500 rounded-full h-2 mb-4 mt-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
          <p className="text-sm p-1">
            {rewardMilestone - rewardPoints > 0
              ? `Only ${rewardMilestone - rewardPoints} points to your next reward!`
              : 'Congratulations! You’ve reached your next reward milestone!'}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-base p-2">
        <h1 className="text-2xl font-semibold text-base-content mb-4">Your Profile</h1>

        {/* Personal Information */}
        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary bg-base-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="businessName">
            Business Name
          </label>
          <input
            type="text"
            id="businessName"
            name="businessName"
            value={profileData.businessName}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary bg-base-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="email">
            Email ID
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={profileData.email}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary bg-base-800"
          />
        </div>

        {/* Business Information */}
        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="businessLink">
            Business Link
          </label>
          <input
            type="text"
            id="businessLink"
            name="businessLink"
            value={profileData.businessLink}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary bg-base-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={profileData.city}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary bg-base-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-primary text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={profileData.state}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-primary bg-base-800"
          />
        </div>

        {/* Save Changes Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-base hover:bg-base-700 text-primary font-semibold py-2 px-10 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default SellerAccount;
