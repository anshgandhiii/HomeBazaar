import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import {Link} from 'react-router-dom'

const Button = ({ className, children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md transition duration-200 ease-in-out ${className}`}
    {...props}
  >
    {children}
  </button>
);

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Wireless Earbuds", price: 79.99, quantity: 1 },
    { id: 2, name: "Smartphone Case", price: 19.99, quantity: 2 },
    { id: 3, name: "USB-C Cable", price: 9.99, quantity: 3 },
  ]);

  const updateQuantity = (id, newQuantity) => {
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: Math.max(1, newQuantity) } : item
    ));
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Your Shopping Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg shadow-inner">
          <ShoppingBag className="mx-auto mb-4 text-gray-400" size={64} />
          <p className="text-2xl text-gray-600 mb-4">Your cart is empty</p>
          <Button className="bg-blue-500 text-white hover:bg-blue-600 transform hover:scale-105">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                <div className="flex items-center space-x-4">
                  <img src={`/api/placeholder/80/80`} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                    <p className="text-blue-500 font-medium">${item.price.toFixed(2)}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)} 
                      className="bg-gray-200 text-gray-600 hover:bg-gray-300 w-8 h-8 flex items-center justify-center rounded-l-md text-xl font-bold"
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-medium bg-gray-100">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)} 
                      className="bg-gray-200 text-gray-600 hover:bg-gray-300 w-8 h-8 flex items-center justify-center rounded-r-md text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  <Button 
                    onClick={() => removeItem(item.id)} 
                    className="text-red-500 hover:text-red-600 bg-red-100 hover:bg-red-200 rounded-md w-10 h-10 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-gray-200"></div>
              <div className="flex justify-between text-xl font-bold text-gray-800">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
            
          <Link to="/consumer/payment">
            <Button className="w-full mt-8 bg-blue-500 text-white hover:bg-blue-600 text-lg font-semibold py-3 rounded-lg transform transition duration-200 hover:scale-105 flex items-center justify-center">
                Proceed to Checkout
                <ArrowRight className="ml-2" size={20} />
            </Button>
            </Link>

        </>
      )}
    </div>
  );
};

export default ShoppingCartPage;