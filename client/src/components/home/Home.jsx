import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const featuredProducts = [
  { id: 1, name: 'Wireless Earbuds', price: 79.99, image: '/api/placeholder/300/300' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: '/api/placeholder/300/300' },
  { id: 3, name: 'Laptop Backpack', price: 49.99, image: '/api/placeholder/300/300' },
  { id: 4, name: 'Fitness Tracker', price: 89.99, image: '/api/placeholder/300/300' },
];

const recommendedCategories = [
  { id: 1, name: 'Summer Essentials', image: '/api/placeholder/400/200' },
  { id: 2, name: 'Work From Home', image: '/api/placeholder/400/200' },
  { id: 3, name: 'Fitness & Wellness', image: '/api/placeholder/400/200' },
];

const frequentlyBoughtProducts = [
  { id: 1, name: 'Phone Charger', price: 14.99, image: '/api/placeholder/150/150' },
  { id: 2, name: 'Water Bottle', price: 24.99, image: '/api/placeholder/150/150' },
  { id: 3, name: 'Wireless Mouse', price: 29.99, image: '/api/placeholder/150/150' },
  { id: 4, name: 'Notebook Set', price: 12.99, image: '/api/placeholder/150/150' },
  { id: 5, name: 'Desk Lamp', price: 39.99, image: '/api/placeholder/150/150' },
];

const HeroBanner = () => (
  <div className="bg-gray-200 py-12">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Summer Sale Up to 50% Off</h2>
      <p className="mb-6">Discover amazing deals on all your favorite products!</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
        Shop Now
      </button>
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-white p-4 rounded shadow">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
    <h3 className="font-semibold mb-2">{product.name}</h3>
    <p className="text-gray-600">${product.price.toFixed(2)}</p>
    <Link 
      to="/consumer/product" 
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-center inline-block">
      Add to Cart
    </Link>

  </div>
);

const FeaturedProducts = () => (
  <section className="py-12">
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </section>
);

const RecommendedCategories = () => (
  <section className="py-12 bg-gray-100">
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Recommended Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedCategories.map((category) => (
          <div key={category.id} className="relative overflow-hidden rounded-lg shadow-md group">
            <img src={category.image} alt={category.name} className="w-full h-48 object-cover transition duration-300 group-hover:scale-110" />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <h3 className="text-white text-xl font-semibold">{category.name}</h3>
            </div>
            <div className="absolute bottom-4 right-4 bg-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-300">
              <ChevronRight className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FrequentlyBoughtProducts = () => (
  <section className="py-12">
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Frequently Bought</h2>
      <div className="flex overflow-x-auto space-x-4 pb-4">
        {frequentlyBoughtProducts.map((product) => (
          <div key={product.id} className="flex-shrink-0 w-40">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-2" />
            <h3 className="font-semibold text-sm mb-1 truncate">{product.name}</h3>
            <p className="text-gray-600 text-sm">${product.price.toFixed(2)}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        <HeroBanner />
        <RecommendedCategories />
        <FeaturedProducts />
        <FrequentlyBoughtProducts />
      </main>
    </div>
  );
};

export default Home;