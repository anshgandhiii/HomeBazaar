import React, { useState, useEffect, useRef } from "react";
import { Camera } from "lucide-react";
import { Link } from "react-router-dom";
import ARViewer from "./ARViewer";

const ProductPage = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [startPosition, setStartPosition] = useState({ x: 0, y: 0 });
  const [is3DMode, setIs3DMode] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("default");
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [isAddedToWishlist, setIsAddedToWishlist] = useState(false);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);

  const product = {
    name: "Wooden Chair",
    price: 199.99,
    description: "Stay connected and track your fitness with our latest smartwatch. Features include heart rate monitoring, GPS, and water resistance.",
    availability: "In Stock",
    rating: 4.5,
    reviews: 128,
    image: "https://unsplash.com/photos/selective-focus-photography-of-green-sprout-on-brown-pot-OXBdrPj606o",
    variants: ["Black", "Silver", "Gold"],
    sizes: ["Small", "Medium", "Large"]
  };

  useEffect(() => {
    document.title = `${product.name} | Our Store`;
  }, []);

  const handleMouseDown = (e) => {
    if (is3DMode) {
      setIsDragging(true);
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && is3DMode) {
      const deltaX = e.clientX - startPosition.x;
      const deltaY = e.clientY - startPosition.y;
      setRotation({
        x: rotation.x + deltaY * 0.5,
        y: rotation.y + deltaX * 0.5
      });
      setStartPosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggle3DMode = () => {
    setIs3DMode(!is3DMode);
    setRotation({ x: 0, y: 0 });
  };

  const handleAddToCart = () => {
    try {
      // Simulating an API call
      setTimeout(() => {
        setIsAddedToCart(true);
        setError(null);
      }, 1000);
    } catch (err) {
      setError("Failed to add item to cart. Please try again.");
    }
  };

  const handleAddToWishlist = () => {
    setIsAddedToWishlist(!isAddedToWishlist);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="text-yellow-400">★</span>
        ))}
        {halfStar && <span className="text-yellow-400">½</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="text-gray-300">☆</span>
        ))}
      </>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row">
    <ARViewer />
        <div className="w-full" style={{width:'190%'}}>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <button className="bg-blue-500 text-white p-2 rounded-lg" onClick={()=>window.location.href="product/ar"}>
            View AR
          </button>

          <div className="flex items-center mb-4">
            <div className="flex mr-2">{renderStars(product.rating)}</div>
            <span className="text-gray-600">{product.reviews} reviews</span>
          </div>
          <p className="text-2xl font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-2">Variants</h2>
            <div className="flex space-x-2">
              {product.variants.map((variant) => (
                <button
                  key={variant}
                  className={`px-4 py-2 rounded-md ${
                    selectedVariant === variant
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                  onClick={() => setSelectedVariant(variant)}
                >
                  {variant}
                </button>
              ))}
            </div>
          </div>
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
          <div className="flex space-x-4 mb-6">
            <Link to="../cart"
            className={`flex-1 py-3 px-6 rounded-md text-white font-semibold transition duration-200 ${isAddedToCart ? "bg-green-500" : "bg-blue-500 hover:bg-blue-600"}`}
            onClick={handleAddToCart}
            disabled={isAddedToCart}
            >

              {isAddedToCart ? "Added to Cart" : "Add to Cart"}
            </Link>
            {/* <button
              className={`py-3 px-6 rounded-md font-semibold transition duration-200 ${isAddedToWishlist ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"}`}
              onClick={handleAddToWishlist}
            >
              {isAddedToWishlist ? "Bought" : "Buy"}
            </button> */}
          </div>
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline"> {error}</span>
            </div>
          )}
          <p className="text-sm text-gray-600">
            Availability: <span className="font-semibold text-green-600">{product.availability}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;