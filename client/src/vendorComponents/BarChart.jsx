import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = () => {
  const data = {
    labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    datasets: [
      {
        label: 'Tasks Completed',
        data: [5, 12, 19, 3, 5, 2, 8],
        backgroundColor: 'rgb(67, 24, 255)',
      },
      {
        label: 'Tasks Pending',
        data: [3, 7, 11, 5, 8, 3, 4],
        backgroundColor: 'rgb(106, 210, 255)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: {
        grid: {
          color: '#20232A', // White grid color for the x-axis
        },
      },
      y: {
        grid: {
          color: '#20232A', // White grid color for the y-axis
        },
      },
    },
  };

  return (
    <div className="bg-dark p-2 px-4 pt-4 rounded-lg shadow-md">
        <h2 className='text-lg font-bold mb-4 text-primary'>Monthly Sales Overview</h2>
      <div style={{ height:'300px'}}>
      <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default BarChart;
