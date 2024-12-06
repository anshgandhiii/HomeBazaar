import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ProductPage = () => {

    // Hardcoded product data
    const product = {
      name: 'Modern Kitchen Chair',
      image: 'https://codesandbox.io/api/v1/sandboxes/6d97z4/screenshot.png', // Replace with your actual image URL
      price: 99.99,
      description: 'A comfortable and modern chair perfect for your kitchen.',
      rating: 4,
      reviews: 150,
      variants: ['Wooden', 'Plastic', 'Metal'],
      sizes: ['Small', 'Medium', 'Large'],
      availability: 'In Stock',
    };
  
  
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);

  const handleAddToCart = () => {
    // Add to cart logic here
    setIsAddedToCart(true);
  };
  

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          fill={i < rating ? 'currentColor' : 'none'}
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-5 h-5 text-yellow-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 17.27l-5.18 3.09 1.64-6.91-5.45-4.73 6.91-.59L12 2l2.18 6.54 6.91.59-5.45 4.73 1.64 6.91L12 17.27z"
          />
        </svg>
      );
    }
    return stars;
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Product Image */}
        <div className="w-full md:w-1/2" onClick={() => window.location.href = '/consumer/product/ar'}
          >
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-96 rounded-lg shadow-lg cursor-pointer"
          />
        </div>

        {/* Product Details */}
        <div className="w-full md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {/* View AR Button */}
          <button
            className="bg-blue-500 text-white p-2 rounded-lg mb-4"
            onClick={() => window.location.href = '/consumer/product/ar'}
          >
            View AR
          </button>

          {/* Rating and Reviews */}
          <div className="flex items-center mb-4">
            <div className="flex mr-2">{renderStars(product.rating)}</div>
            <span className="text-gray-600">{product.reviews} reviews</span>
          </div>

          {/* Price */}
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>

          {/* Product Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Variants */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Variants</h2>
            <div className="flex space-x-2">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  className={`px-4 py-2 rounded-md ${selectedVariant === variant ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Size</h2>
            <select
              className="w-full p-2 border rounded-md"
              onChange={(e) => console.log(e.target.value)}
            >
              {product.sizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity Selector */}
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Quantity</h2>
            <div className="flex items-center">
              <button
                className="px-3 py-1 border rounded-l-md hover:bg-gray-100"
                onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b"
              />
              <button
                className="px-3 py-1 border rounded-r-md hover:bg-gray-100"
                onClick={() => setQuantity((prev) => prev + 1)}
              >
                +
              </button>
            </div>
          </div>

          {/* Add to Cart Button */}
          <div className="flex space-x-4 mb-6">
            <Link
              to="../cart"
              className={`flex-1 py-3 px-6 rounded-md text-white font-semibold transition duration-200 ${isAddedToCart ? 'bg-green-500' : 'bg-blue-500 hover:bg-blue-600'}`}
              onClick={handleAddToCart}
              disabled={isAddedToCart}
            >
              {isAddedToCart ? 'Added to Cart' : 'Add to Cart'}
            </Link>
          </div>

          {/* Availability */}
          <p className="text-sm text-gray-600">
            Availability: <span className="font-semibold text-green-600">{product.availability}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
