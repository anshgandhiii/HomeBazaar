import React from 'react';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';


const featuredProducts = [
  { id: 1, name: 'Wooden Chair', price: 79.99, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80' },
  { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 3, name: 'Laptop Backpack', price: 49.99, image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
  { id: 4, name: 'Fitness Tracker', price: 89.99, image: 'https://images.unsplash.com/photo-1557935728-e6d1eaabe558?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
];

const recommendedCategories = [
  { id: 1, name: 'Summer Essentials', image: 'https://images.unsplash.com/photo-1517398823963-c2dc6fc3e837?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
  { id: 2, name: 'Work From Home', image: 'https://images.unsplash.com/photo-1585373683920-671438c82bfa?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
  { id: 3, name: 'Fitness & Wellness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80' },
];

const frequentlyBoughtProducts = [
  { id: 1, name: 'Phone Charger', price: 14.99, image: 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
  { id: 2, name: 'Water Bottle', price: 24.99, image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
  { id: 3, name: 'Wireless Mouse', price: 29.99, image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
  { id: 4, name: 'Notebook Set', price: 12.99, image: 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
  { id: 5, name: 'Desk Lamp', price: 39.99, image: 'https://images.unsplash.com/photo-1573790387438-4da905039392?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80' },
];

const HeroBanner = () => (
  <div className="bg-base-200 py-12">
    <div className="container mx-auto text-center">
      <h2 className="text-4xl font-bold mb-4">Summer Sale Up to 50% Off</h2>
      <p className="mb-6">Discover amazing deals on all your favorite products!</p>
      <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition duration-300">
        Shop Now
      </button>
    </div>
  </div>
);

const ProductCard = ({ product }) => (
  <div className="bg-base p-4 rounded shadow">
    <img src={product.image} alt={product.name} className="w-full h-48 object-cover mb-4" />
    <h3 className="font-semibold mb-2">{product.name}</h3>
    <p className="text-base-content-600">${product.price.toFixed(2)}</p>
    <Link 
      to="/consumer/product" 
      className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full text-center inline-block transition duration-300">
      Buy
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
  <section className="py-12 bg-base-100">
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6">Recommended Categories</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendedCategories.map((category) => (
          <div key={category.id} className="relative overflow-hidden rounded-lg shadow-md group">
            <Link to="/consumer/category">
              <img src={category.image} alt={category.name} className="w-full h-48 object-cover transition duration-300 group-hover:scale-110" />
              <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                <h3 className="text-white text-xl font-semibold">{category.name}</h3>
              </div>
              <div className="absolute bottom-4 right-4 bg-blue-600 rounded-full p-2 opacity-0 group-hover:opacity-100 transition duration-300">
                <ChevronRight className="w-6 h-6 text-white" />
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const FrequentlyBoughtProducts = () => (
  <section className="py-12 bg-base">
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-base-content">Frequently Bought</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {frequentlyBoughtProducts.map((product) => (
          <div key={product.id} className="bg-base p-4 rounded-lg border border-base-content shadow-md transition duration-300 hover:shadow-lg">
            <img src={product.image} alt={product.name} className="w-full h-40 object-cover rounded-md mb-3" />
            <h3 className="font-semibold text-sm mb-1 truncate text-base-content">{product.name}</h3>
            <p className="text-base-content text-sm mb-2">${product.price.toFixed(2)}</p>
            <div className="flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white text-sm py-1 px-2 rounded hover:bg-blue-700 transition duration-300">
                Add to Cart
              </button>
              <button className="flex-1 bg-blue-600 text-white text-sm py-1 px-2 rounded hover:bg-blue-700 transition duration-300">
                Buy
              </button>
            </div>
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