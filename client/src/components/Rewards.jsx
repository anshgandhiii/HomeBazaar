import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FaCoins } from 'react-icons/fa';
import Swal from 'sweetalert2'; // Import SweetAlert2

const RewardsPage = () => {
  const [rewards, setRewards] = useState([]);
  const [totalCoins, setTotalCoins] = useState(500); // Set initial coins to 500

  useEffect(() => {
    const fetchData = async () => {
      try {
        const rewardsResponse = await axios.get('http://localhost:8000/api/user/rewards/');
        // Set the rewards and initialize claimed status
        const updatedRewards = rewardsResponse.data.map(reward => ({ ...reward, claimed: false }));
        setRewards(updatedRewards);
      } catch (error) {
        console.error('Error fetching rewards:', error);
      }
    };

    fetchData();
  }, []);

  const handleClaimReward = (reward) => {
    if (totalCoins < reward.coins_required) {
      // Show an error alert if the user doesn't have enough coins
      Swal.fire({
        icon: 'error',
        title: 'Not Enough Coins',
        text: `You need ${reward.coins_required} coins to claim ${reward.name}, but you only have ${totalCoins} coins.`,
      });
      return; // Exit the function early
    }

    // Show confirmation dialog
    Swal.fire({
      title: 'Confirm Purchase',
      text: `Are you sure you want to claim ${reward.name} for ${reward.coins_required} coins?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, claim it!',
      cancelButtonText: 'No, cancel!',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.post('http://localhost:8000/api/user/claim_reward/', {
            rewardId: reward.id,
            email: "user@example.com" // Replace with actual user email
          });

          // Update the reward's claimed status
          setRewards(prevRewards => 
            prevRewards.map(r => 
              r.id === reward.id ? { ...r, claimed: true } : r
            )
          );

          setTotalCoins(totalCoins - reward.coins_required); // Update total coins after claiming
          Swal.fire('Claimed!', `You have successfully claimed ${reward.name}!`, 'success');
        } catch (error) {
          console.error('Error claiming reward:', error);
          Swal.fire('Error!', 'There was an error claiming your reward.', 'error');
        }
      }
    });
  };

  return (
    <div className="min-h-screen bg-base-100 p-8">
      <h1 className="text-4xl font-bold text-center mb-12">Claim Rewards Using Your Coins</h1>

      {/* Coins Display Section */}
      <div className="flex items-center justify-center mb-8">
        <FaCoins className="text-4xl mr-2" />
        <h2 className="text-2xl font-semibold">Total Coins: {totalCoins}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rewards.map((reward) => (
          <motion.div
            key={reward.id}
            className="card w-full bg-base-200 shadow-xl transition-transform duration-300"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="card-body items-center text-center">
              <img
                src={reward.image}
                alt={reward.name}
                className="w-24 h-24 mb-4 object-cover rounded-full"
              />
              <h2 className="card-title">{reward.name}</h2>
              <p className="text-lg font-semibold">Coins Required: {reward.coins_required}</p>
              <p className="text-sm text-gray-600">Status: {reward.status}</p>
              <div className="card-actions justify-center">
                <motion.button
                  className={`btn ${reward.claimed ? 'btn-secondary' : 'btn-primary'} btn-sm`}
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  onClick={() => handleClaimReward(reward)}
                  disabled={reward.claimed} // Disable button if claimed
                >
                  {reward.claimed ? 'Claimed' : 'Claim Reward'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Additional styles can be added here if necessary */}
    </div>
  );
};

export default RewardsPage;
