import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSun, FiMoon } from 'react-icons/fi';
import './Landingpage.css'; // Import Tailwind CSS styles
import { Atom } from 'lucide-react';
import { Link } from 'react-router-dom';

const Landingpage = () => {
    const [theme, setTheme] = useState('dark');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
        document.documentElement.setAttribute('data-theme', theme);
    };

    return (
        <div className={`min-h-screen transition-colors duration-500 ease-in-out ${theme === 'dark' ? 'bg-gradient-to-r from-gray-800 to-black' : 'bg-gradient-to-r from-purple-200 to-gray-100'} text-gray-900`}>
            {/* Header/Navbar */}
            <header className="flex justify-between items-center p-6 backdrop-blur-lg bg-opacity-30 rounded-lg shadow-lg">
                <div className="text-3xl font-extrabold text-white">
                    <div className='flex items-center'>
                    <Atom className='mr-2 text-primary'/>
                    <h2 className='text-primary'>HomeBazaar</h2>
                    </div>
                    </div>
                <nav className="space-x-6">
                    <a href="#features" className="text-white hover:text-primary transition duration-300">Features</a>
                    <a href="#products" className="text-white hover:text-primary transition duration-300">Products</a>
                    <a href="#contact" className="text-white hover:text-primary transition duration-300">Contact</a>
                    <button className="bg-primary p-2 rounded-lg text-white" onClick={()=>window.location.href="/signup"}>Get Started</button>
                    <button className="ml-4" onClick={toggleTheme}>
                        {theme === 'light' ? <FiMoon size={24} color="white" /> : <FiSun size={24} color="primary" />}
                    </button>
                </nav>
            </header>

            {/* Hero Section */}
            <motion.section
                className="flex flex-col items-center text-center py-24"
                lassName="p-4 bg-gray-800 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}
            >
                <h1 className={`text-6xl font-extrabold text-transparent bg-clip-text ${theme === 'dark' ? 'bg-gradient-to-r from-purple-200 to-gray-100' : 'bg-gradient-to-r from-gray-800 to-black'}`}>
                    Elevate Your Home-Based Business
                </h1>

                <p className="mt-4 text-xl text-white">Join us in driving sales and engaging customers with innovative tools.</p>
                <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="mt-8 btn btn-primary bg-primary text-white"
                >
                    <Link to="/login">Explore Now</Link>
                </motion.button>

                {/* 360 Degree Product Showcase */}
                <div className=" mt-12 relative">
                    <motion.img 
                        // src="" // Replace with actual image
                        className="w-80 anurag h-80 object-cover rounded-lg shadow-lg"
                        initial={{ scale: 1.2, rotate: 0 }}
                        animate={{ scale: 1, rotate: 360 }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    <p className="mt-4 text-gray-300">Experience our products with a 360-degree view.</p>
                </div>
            </motion.section>

            {/* Features Section without Animations */}
            <motion.section className="py-24 px-12" id="features"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}>
                <h2 className="text-4xl font-bold text-center text-white">Key Features & Benefits</h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature Cards */}
                    <FeatureCard title="Seller & Consumer Dashboards" description="Manage your products or track your eco-friendly purchases with our intuitive dashboards." />
                    <FeatureCard title="Reward System" description="Earn rewards as a seller by adding more products, or as a consumer by purchasing eco-friendly items." />
                    <FeatureCard title="AR Product Preview" description="See how products look in your space with our augmented reality feature before making a purchase." />
                    <FeatureCard title="Multi-Language Support" description="Browse and shop in your preferred language with our translation feature." />
                    <FeatureCard title="Eco-Friendly Marketplace" description="Connect with sellers offering sustainable and environmentally conscious products." />
                    <FeatureCard title="Environmental Impact Tracker" description="Monitor the positive impact of your eco-friendly purchases on the environment." />
                </div>
            </motion.section>

            {/* Differentiation Section with Scroll Animation */}
            <section className="py-24 px-12" id="differentiation">
                <h2 className="text-4xl font-bold text-center text-white">For Sellers and Consumers</h2>
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-12">
                    <DifferentiationCard
                        title="For Eco-Friendly Consumers"
                        points={[
                            "Discover a wide range of sustainable products",
                            "Preview items in your space using AR before purchasing",
                            "Earn rewards for making eco-friendly choices",
                            "Track the environmental impact of your purchases",
                            "Connect with like-minded eco-conscious sellers",
                        ]}
                    />
                    <DifferentiationCard
                        title="For Eco-Conscious Sellers"
                        points={[
                            "List your sustainable products on our platform",
                            "Reach environmentally conscious consumers",
                            "Earn rewards for adding more eco-friendly products",
                            "Access detailed analytics on your product performance",
                            "Showcase your products with AR technology",
                        ]}
                    />
                </div>
            </section>

            {/* FAQ Section with Scroll Animation */}
            <motion.section className="py-24 px-12" id="faq"
                lassName="p-4 bg-gray-800 rounded-lg"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 1.2 }}
                viewport={{ once: true }}>
                <h2 className="text-4xl font-bold text-center text-white">Frequently Asked Questions</h2>
                <div className="mt-12 space-y-6">
                    <FAQItem question="How does the AR feature work?" answer="Our AR feature uses your device's camera to show how products would look in your space." />
                    <FAQItem question="What types of rewards can I earn?" answer="You can earn points for every eco-friendly product you purchase." />
                    <FAQItem question="How can I list my products as a seller?" answer="Create an account and fill out the product listing form." />
                </div>
            </motion.section>

            {/* Footer */}
            <footer className="py-6 bg-gray-900 text-gray-400 text-center">
                <p>&copy; 2024 HomeVendor. All rights reserved.</p>
            </footer>
        </div>
    );
};

// FeatureCard Component
const FeatureCard = ({ title, description }) => (
    <motion.div
        lassName="p-4 bg-gray-800 rounded-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        viewport={{ once: true }}
        className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <h3 className="text-2xl font-semibold text-white">{title}</h3>
        <p className="mt-4 text-gray-200">{description}</p>
    </motion.div>
);

// DifferentiationCard Component
const DifferentiationCard = ({ title, points }) => {
    return (
        <motion.div
            className="bg-gray-800 p-8 rounded-lg shadow-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
        >
            <h3 className="text-3xl font-semibold text-white">{title}</h3>
            <ul className="mt-4 text-gray-300">
                {points.map((point, index) => (
                    <li key={index}>• {point}</li>
                ))}
            </ul>
        </motion.div>
    );
};

// FAQItem Component with Scroll Animation using whileInView
const FAQItem = ({ question, answer }) => {
    return (
        <motion.div
            className="p-4 bg-gray-800 rounded-lg"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
        >
            <h3 className="text-xl font-semibold text-white">{question}</h3>
            <p className="mt-2 text-gray-300">{answer}</p>
        </motion.div>
    );
};

export default Landingpage;
