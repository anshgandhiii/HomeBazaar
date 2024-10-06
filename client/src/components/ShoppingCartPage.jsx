import React, { useState } from 'react';
import { Trash2, ShoppingBag, ArrowRight, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

const Button = ({ className, children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md transition duration-200 ease-in-out ${className}`}
    {...props}
  >
    {children}
  </button>
);

const availableProducts = [
  {
    id: 1,
    name: 'Wooden Chair',
    price: 79.99,
    ecoFriendly: true,
    lifespan: 12, // lifespan in months
    image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    name: 'Smart Watch',
    price: 199.99,
    ecoFriendly: false,
    lifespan: 36,
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 3,
    name: 'Laptop Backpack',
    price: 49.99,
    ecoFriendly: true,
    lifespan: 24,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
  {
    id: 4,
    name: 'Fitness Tracker',
    price: 89.99,
    ecoFriendly: false,
    lifespan: 18,
    image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80',
  },
];

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, newQuantity) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(0, newQuantity) } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Calculate total eco-coins based on eco-friendly products
  const ecoCoins = cartItems.reduce((sum, item) => {
    return sum + (item.ecoFriendly ? item.price * item.quantity * 0.05 : 0); // Earn coins for eco-friendly items
  }, 0);

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-base rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-base-content">Your Shopping Cart</h1>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-base-content">Available Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {availableProducts.map((product) => (
            <div key={product.id} className="bg-base-200 p-4 rounded-lg shadow-sm transition-transform transform hover:-translate-y-1">
              <img src={product.image} alt={product.name} className="w-full h-32 object-cover rounded-md mb-2" />
              <h3 className="font-semibold text-base-content">{product.name}</h3>
              <p className="text-base-content">${product.price.toFixed(2)}</p>
              {product.ecoFriendly && (
                <p className="text-green-500 font-medium">Eco-Friendly! 🌱</p>
              )}
              <Button
                onClick={() => addToCart(product)}
                className="mt-2 w-full bg-primary text-primary-content hover:bg-primary-focus"
              >
                <Plus size={16} className="inline mr-2" /> Add to Cart
              </Button>
            </div>
          ))}
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-base-200 rounded-lg shadow-inner">
          <ShoppingBag className="mx-auto mb-4 text-base-content" size={64} />
          <p className="text-2xl text-base-content mb-4">Your cart is empty</p>
          <Button className="bg-primary text-primary-content hover:bg-primary-focus transform hover:scale-105">
            Continue Shopping
          </Button>
        </div>
      ) : (
        <>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between bg-base-200 p-4 rounded-lg shadow-md transition duration-300 ease-in-out hover:shadow-lg">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                  <div>
                    <h3 className="text-lg font-semibold text-base-content">{item.name}</h3>
                    <p className="text-primary font-medium">${item.price.toFixed(2)}</p>
                    {item.ecoFriendly && (
                      <span className="text-green-500 font-medium">Eco-Friendly! 🌱</span>
                    )}
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className={`bg-base-300 text-base-content hover:bg-base-opacity w-8 h-8 flex items-center justify-center rounded-l-md text-xl font-bold ${
                        item.quantity <= 1 ? 'opacity-50 cursor-not-allowed' : ''
                      }`}
                    >
                      −
                    </button>
                    <span className="w-10 text-center font-medium bg-base-100 text-base-content">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="bg-base-300 text-base-content hover:bg-base-opacity w-8 h-8 flex items-center justify-center rounded-r-md text-xl font-bold"
                    >
                      +
                    </button>
                  </div>
                  <Button
                    onClick={() => removeItem(item.id)}
                    className="text-error hover:text-error-content bg-error bg-opacity-20 hover:bg-opacity-30 rounded-md w-10 h-10 flex items-center justify-center"
                  >
                    <Trash2 size={18} />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Eco Coins Section */}
          {ecoCoins > 0 && (
            <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 rounded-md">
              <h3 className="font-semibold">You earned Eco-Coins!</h3>
              <p>Coins earned from your eco-friendly purchases: {ecoCoins.toFixed(2)} coins</p>
            </div>
          )}

          {/* Cart Summary */}
          <div className="mt-8 bg-base p-6 rounded-lg shadow-md">
            <div className="space-y-4">
              <div className="flex justify-between text-base-content">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base-content">
                <span>Tax (10%):</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="h-px bg-base-content bg-opacity-20"></div>
              <div className="flex justify-between text-xl font-bold text-base-content">
                <span>Total:</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Checkout Button */}
          <Link to="/consumer/payment">
            <Button className="w-full mt-8 bg-primary text-primary-content hover:bg-primary-focus text-lg font-semibold py-3 rounded-lg transform transition duration-200 hover:scale-105 flex items-center justify-center">
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