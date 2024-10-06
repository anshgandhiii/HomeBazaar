import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { AiOutlineArrowUp, AiOutlineUser } from 'react-icons/ai'; // Example icons

const SellerSales = () => {
  // Placeholder for sales data
  const salesData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'Product Sales',
        data: [30, 45, 28, 60, 75, 50, 90, 100, 80, 120, 140, 110], // Placeholder data
        fill: false,
        borderColor: '#20cfff',
        tension: 0.05,
      },
    ],
  };
  const options = {
    scales: {
      x: {
        grid: {
          color: '#20232A', // Set the grid color to dark for the x-axis
        },
      },
      y: {
        grid: {
          color: '#20232A', // Set the grid color to dark for the y-axis
        },
      },
    },
  };

  const [salesAnalytics] = useState({
    totalSales: 1200,
    monthlyIncrease: '15%',
    bestSellingProduct: 'Product XYZ',
    totalCustomers: 450,
  });

  return (
    <div className="md:ml-[14%] bg-base p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-base-content">Marketing Dashboard</h2>

      {/* Time vs Product Sales Graph */}
      <div className="p-6 bg-dark rounded-lg shadow">
        <h3 className="text-lg font-medium text-base-content">Time vs Product Sales</h3>
        <Line data={salesData} options={options} />
      </div>

      {/* Sales Analytics Section */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-base-content">Sales Analytics</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 bg-dark rounded-lg shadow flex items-center">
            <AiOutlineArrowUp className="text-3xl text-green-500 mr-2" />
            <div>
              <h4 className="text-white font-medium">Total Sales</h4>
              <p className="text-xl text-base-base-contentfont-semibold">{salesAnalytics.totalSales}</p>
            </div>
          </div>

          <div className="p-4 bg-dark rounded-lg shadow flex items-center">
            <AiOutlineArrowUp className="text-3xl text-green-500 mr-2" />
            <div>
              <h4 className="text-white font-medium">Monthly Sales Increase</h4>
              <p className="text-xl text-base-content font-semibold">{salesAnalytics.monthlyIncrease}</p>
            </div>
          </div>

          <div className="p-4 bg-dark rounded-lg shadow flex items-center">
            <AiOutlineUser className="text-3xl text-blue-500 mr-2" />
            <div>
              <h4 className="text-white font-medium">Best Selling Product</h4>
              <p className="text-xl text-base-content font-semibold">{salesAnalytics.bestSellingProduct}</p>
            </div>
          </div>

          <div className="p-4 bg-dark rounded-lg shadow flex items-center">
            <AiOutlineUser className="text-3xl text-blue-500 mr-2" />
            <div>
              <h4 className="text-white font-medium">Total Customers</h4>
              <p className="text-xl text-base-content font-semibold">{salesAnalytics.totalCustomers}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerSales;
