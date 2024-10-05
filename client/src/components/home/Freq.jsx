import React, { useState, useEffect } from 'react';

export default function Freq() {
  const [items, setItems] = useState([]);

  // Simulate fetching frequently bought items from an API
  useEffect(() => {
    const fetchData = async () => {
      const frequentlyBoughtItems = [
        { id: 1, name: 'Product A', price: 25.99, image: 'https://via.placeholder.com/150' },
        { id: 2, name: 'Product B', price: 40.00, image: 'https://via.placeholder.com/150' },
        { id: 3, name: 'Product C', price: 15.50, image: 'https://via.placeholder.com/150' },
      ];
      setItems(frequentlyBoughtItems);
    };

    fetchData();
  }, []);

  return (
    <div className="frequently-bought-section max-w-6xl mx-auto py-8 px-4">
      <h2 className="text-2xl font-bold mb-6 text-center">Frequently Bought Items</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map(item => (
          <div key={item.id} className="card shadow-md hover:shadow-lg transition-shadow duration-300 bg-white rounded-lg overflow-hidden">
            <img src={item.image} alt={item.name} className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-105" />
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-gray-600 mb-4">${item.price.toFixed(2)}</p>
              <button className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors duration-200">Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
