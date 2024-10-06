import { useState } from 'react';

const SellersOrders = () => {
  const [orders, setOrders] = useState([
    {
      orderId: '12345',
      customerName: 'John Doe',
      products: [
        { name: 'Product 1', quantity: 2 },
        { name: 'Product 2', quantity: 1 },
      ],
      totalAmount: 150,
      status: 'Pending',
      orderDate: '2024-10-01',
    },
    {
      orderId: '12346',
      customerName: 'Jane Smith',
      products: [
        { name: 'Product 3', quantity: 1 },
      ],
      totalAmount: 100,
      status: 'Accepted',
      orderDate: '2024-10-03',
    },
    // Add more orders here...
  ]);

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId
          ? { ...order, status: newStatus }
          : order
      )
    );
  };

  const handleCancelOrder = (orderId) => {
    updateOrderStatus(orderId, 'Cancelled');
  };

  const handleChangeStatus = (orderId, currentStatus) => {
    const nextStatus = {
      'Pending': 'Accepted',
      'Accepted': 'Shipped',
      'Shipped': 'Delivered',
      'Delivered': 'Delivered',
    };
    const newStatus = nextStatus[currentStatus];
    updateOrderStatus(orderId, newStatus);
  };

  return (
    <div className="md:ml-[14%] mx-6 h-screen space-y-4 bg-base p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-primary">Orders</h2>
      {orders.length === 0 ? (
        <p>No orders available.</p>
      ) : (
        <table className="min-w-full table-auto">
          <thead className="bg-dark">
            <tr>
              <th className="px-4 py-2 text-left text-sm font-medium text-primary">Order ID</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-primary">Customer</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-primary">Products</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-primary">Total</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-primary">Status</th>
              <th className="px-4 py-2 text-left text-sm font-medium text-primary">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.orderId} className="border-t">
                <td className="px-4 py-2 text-sm text-primary">{order.orderId}</td>
                <td className="px-4 py-2 text-sm text-primary">{order.customerName}</td>
                <td className="px-4 py-2 text-sm text-primary">
                  {order.products.map((product, index) => (
                    <div key={index}>
                      {product.name} x {product.quantity}
                    </div>
                  ))}
                </td>
                <td className="px-4 py-2 text-sm text-primary">${order.totalAmount}</td>
                <td className={`px-4 py-2 text-sm font-semibold ${getStatusClass(order.status)}`}>
                  {order.status}
                </td>
                <td className="px-4 py-2 text-sm">
                  {order.status !== 'Cancelled' && order.status !== 'Delivered' && (
                    <>
                      <button
                        onClick={() => handleChangeStatus(order.orderId, order.status)}
                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                      >
                        {order.status === 'Shipped' ? 'Deliver' : 'Next'}
                      </button>
                      <button
                        onClick={() => handleCancelOrder(order.orderId)}
                        className="bg-red-500 text-white px-3 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Helper function to style the status dynamically
const getStatusClass = (status) => {
  switch (status) {
    case 'Pending':
      return 'text-yellow-500';
    case 'Accepted':
      return 'text-blue-500';
    case 'Shipped':
      return 'text-indigo-500';
    case 'Delivered':
      return 'text-green-500';
    case 'Cancelled':
      return 'text-red-500';
    default:
      return '';
  }
};

export default SellersOrders;
