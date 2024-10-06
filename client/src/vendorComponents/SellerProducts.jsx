import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import Cookies from "js-cookie";

const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(product || {
        name: '',
        price: '',
        stock: '',
        category: '',
        image: '/api/placeholder/200/200',
        metaTitle: '',
        metaDescription: '',
        tags: [],
        metaKeywords: '',
        life_span: '',
    });
    const [loadingGen, setLoadingGen] = useState(false);
    const [loadingGenforTitle, setLoadingGenforTitle] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            name: formData.name,
            manufacturer: formData.manufacturer || "Product name",
            ingredients: formData.ingredients || "Pure soap",
            life_span: formData.life_span || "12 months",
            price: formData.price || "100.00",
            offers: formData.offers || null,
            category: formData.category || "other",
            seller: formData.seller || 1,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/user/products/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('access_token')}`,
                },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
            }

            const data = await response.json();
            console.log("Product added successfully:", data);
            onSave(data);
        } catch (error) {
            console.error("Error adding product:", error);
            alert("Failed to add product. Please try again."); // User feedback on error
        }
    };

    const generateAboutText = async (prompt) => {
        try {
            setLoadingGen(true);
            const API_KEY = 'YOUR_API_KEY'; // Ensure to secure your API key
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{ parts: [{ text: prompt }] }],
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.candidates[0].content.parts[0].text;
        } catch (error) {
            console.error("Error generating about text:", error);
            return '';
        } finally {
            setLoadingGen(false);
        }
    };

    const handleGenerateClick = async () => {
        if (!formData.name) {
            alert("Please enter a valid product name before generating meta description.");
            return;
        }
        setLoadingGen(true);
        const generatedText = await generateAboutText(`Generate a SEO ranked Description for product: ${formData.name} in strictly less than 60 characters.`);
        
        if (generatedText) {
            setFormData(prevData => ({
                ...prevData,
                metaDescription: generatedText
            }));
        }
        setLoadingGen(false);
    };

    const handleGenerateClickforTitle = async () => {
        if (!formData.name) {
            alert("Please enter a valid catalog name before generating meta description.");
            return;
        }
        setLoadingGenforTitle(true);
        const generatedText = await generateAboutText(`Generate a SEO ranked title for product: ${formData.name} in strictly less than 25 characters.`);
        
        if (generatedText) {
            setFormData(prevData => ({
                ...prevData,
                metaTitle: generatedText
            }));
        }
        setLoadingGenforTitle(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 bg-dark p-6 rounded-lg shadow-lg">
            <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name"
                className="w-full p-3 border bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                required
            />
            <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Price"
                className="w-full p-3 border bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                required
            />
            <input
                name="stock"
                type="number"
                value={formData.stock}
                onChange={handleChange}
                placeholder="Stock"
                className="w-full p-3 border bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                required
            />
            <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Category"
                className="w-full p-3 border bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                required
            />

            {/* New SEO fields */}
            <div className="space-y-2">
                <div className='flex justify-between items-center'>
                    <label className="block text-sm font-medium text-primary">Meta Tag Title</label>
                    <button 
                        type="button" 
                        onClick={handleGenerateClickforTitle}
                        className="p-1 text-primary rounded-lg hover:bg-gray-200 transition duration-300"
                    >
                        {loadingGenforTitle ? 'Generating...' : 'Generate through AI?'}
                    </button>
                </div>
                <input
                    name="metaTitle"
                    value={formData.metaTitle}
                    onChange={handleChange}
                    placeholder="Meta Tag Title"
                    className="flex-grow p-3 border bg-gray-700 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    maxLength={50}
                />
                <p className="text-sm text-primary">{formData.metaTitle.length}/50</p>
            </div>

            <div className="space-y-2">
                <div className='flex justify-between items-center'>
                    <label className="block text-sm font-medium text-primary">Meta Tag Description</label>
                    <button 
                        type="button" 
                        onClick={handleGenerateClick}
                        className="p-1 text-primary rounded-lg hover:bg-gray-200 transition duration-300"
                    >
                        {loadingGen ? 'Generating...' : 'Generate through AI?'}
                    </button>
                </div>
                <textarea
                    name="metaDescription"
                    value={formData.metaDescription}
                    onChange={handleChange}
                    placeholder="Meta Tag Description"
                    className="flex-grow p-3 border bg-gray-700 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
                    maxLength={160}
                />
                <p className="text-sm text-primary">{formData.metaDescription.length}/160</p>
            </div>

            <button type="submit" className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 rounded-lg text-white transition duration-300">
                {product ? 'Update Product' : 'Add Product'}
            </button>
            <button type="button" onClick={onCancel} className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition duration-300">
                Cancel
            </button>
        </form>
    );
};

export default ProductForm;
