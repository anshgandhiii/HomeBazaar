import React from 'react';
import { MdAddTask, MdAttachMoney, MdBarChart, MdFileCopy } from 'react-icons/md';
import BarChart from './BarChart';
import LineChart from './LineChart';
import PieChart from './PieChart';
import { BadgePercentIcon } from 'lucide-react';

const DashboardCard = ({ title, value, icon }) => (
  <div className="p-4 bg-dark rounded-lg shadow-md flex items-center">
    <div className="mr-4 text-primary">{icon}</div>
    <div>
      <div className="text-white text-sm">{title}</div>
      <div className="text-2xl text-white font-bold">{value}</div>
    </div>
  </div>
);

// Updated data for seller dashboard
const products = [
  { name: 'Handmade Soap', sold: 120 },
  { name: 'Organic Candles', sold: 85 },
  { name: 'Customized Mugs', sold: 60 },
  { name: 'Knitted Scarves', sold: 45 },
];

const recommendations = [
  { name: 'Bamboo Toothbrush', stock: 200 },
  { name: 'Reusable Grocery Bags', stock: 150 },
  { name: 'Organic Tea', stock: 300 },
  { name: 'Herbal Bath Bombs', stock: 180 },
];

const salesGrowth = '15% increase this month';
const totalSales = 935;
const tasks = [
  { name: 'Restock Handmade Soap', time: '2 hours ago', progress: 'Completed' },
  { name: 'Launch Fall Promotion', time: '1 day ago', progress: 'In Progress' },
  { name: 'Update Product Descriptions', time: '2 days ago', progress: 'In Progress' },
  { name: 'Check Inventory Levels', time: '3 days ago', progress: 'Pending' },
];

const SellerDashboard = () => {
  return (
    <div className="md:ml-[14%] p-4 min-h-screen">
      <h2 className="pt-4 text-3xl text-primary font-bold mb-6">Seller Dashboard</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <DashboardCard
          title="Most Bought Products"
          value={`${products.length} items`}
          icon={<MdBarChart className="text-3xl" />}
        />
        <DashboardCard
          title="Track of Products Sold"
          value={`${products.reduce((total, product) => total + product.sold, 0)} sold`}
          icon={<MdAttachMoney className="text-3xl" />}
        />
        <DashboardCard
          title="Recommendations to Stock"
          value={`${recommendations.length} products`}
          icon={<MdAddTask className="text-3xl" />}
        />
        <DashboardCard
          title="Sales Analytics"
          value={salesGrowth}
          icon={<BadgePercentIcon className="text-3xl" />}
        />
        <DashboardCard
          title="Total Sales"
          value={totalSales}
          icon={<MdFileCopy className="text-3xl" />}
        />
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-dark p-4 rounded-lg shadow-md">
          <h3 className="text-lg text-primary font-bold mb-4">Assigned Tasks</h3>
          <ul className="space-y-4">
            {tasks.map((task, index) => (
              <li key={index} className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-white">{task.name}</p>
                  <p className="text-sm text-white">{task.time}</p>
                </div>
                <div className="bg-gray-200 rounded-full h-2 w-24">
                  <div
                    className={`h-2 rounded-full ${task.progress === 'Completed' ? 'bg-green-500' : task.progress === 'In Progress' ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: task.progress === 'Completed' ? '100%' : task.progress === 'In Progress' ? '50%' : '25%' }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-dark p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 text-primary">Product Stock Recommendations</h3>
          <div className="space-y-4">
            {recommendations.map((product, index) => (
              <div key={index} className="flex items-center">
                <div className="mr-4">
                  <img
                    className="w-10 h-10 rounded-full"
                    src={`https://randomuser.me/api/portraits/thumb/men/${index + 10}.jpg`}
                    alt="Product"
                  />
                </div>
                <div className="w-full">
                  <div className="flex justify-between mb-2">
                    <p className="font-semibold text-primary">{product.name}</p>
                    <p className="text-sm text-primary">{`${product.stock} in stock`}</p>
                  </div>
                  <div className="bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-400 h-2 rounded-full"
                      style={{ width: `${product.stock / 3}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <PieChart />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <LineChart />
        <BarChart />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
        <div className="bg-dark p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 text-primary">Chats</h3>
          <div className="space-y-4">
            <div className="flex items-center p-3 border rounded-lg">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src="https://randomuser.me/api/portraits/thumb/men/1.jpg"
                alt="User"
              />
              <div>
                <p className="font-semibold text-primary">John Doe</p>
                <p className="text-sm text-white">Inquiry about product pricing...</p>
              </div>
            </div>
            <div className="flex items-center p-3 border rounded-lg">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src="https://randomuser.me/api/portraits/thumb/women/2.jpg"
                alt="User"
              />
              <div>
                <p className="font-semibold text-primary">Jane Smith</p>
                <p className="text-sm text-white">Requesting restock details...</p>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-dark p-4 rounded-lg shadow-md">
          <h3 className="text-lg font-bold mb-4 text-primary">Recent Activities</h3>
          <ul className="space-y-4">
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-primary">Restocked Bamboo Toothbrush</p>
                <p className="text-sm text-white">5 mins ago</p>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-primary">Launched Fall Promotion</p>
                <p className="text-sm text-white">1 hour ago</p>
              </div>
            </li>
            <li className="flex justify-between items-center">
              <div>
                <p className="font-semibold text-primary">Updated product descriptions</p>
                <p className="text-sm text-white">1 hour ago</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
