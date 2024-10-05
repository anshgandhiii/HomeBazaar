import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';


// Simulated product data
const initialProducts = [
    { 
        id: 1, 
        name: 'Handmade Soap', 
        price: 8.99, 
        stock: 50, 
        category: 'Beauty', 
        image: 'https://images.unsplash.com/photo-1542038335240-86aea625b913?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        metaTitle: 'Organic Handmade Soap | Natural Beauty',
        metaDescription: 'Experience the luxury of our handmade organic soap. Gentle on skin, rich in lather, and made with all-natural ingredients.',
        tags: ['organic', 'handmade', 'soap', 'natural beauty'],
        metaKeywords: 'organic soap, handmade soap, natural beauty products'
      },
      { 
        id: 2, 
        name: 'Handmade Soap', 
        price: 8.99, 
        stock: 50, 
        category: 'Beauty', 
        image: 'https://images.unsplash.com/photo-1542038335240-86aea625b913?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        metaTitle: 'Organic Handmade Soap | Natural Beauty',
        metaDescription: 'Experience the luxury of our handmade organic soap. Gentle on skin, rich in lather, and made with all-natural ingredients.',
        tags: ['organic', 'handmade', 'soap', 'natural beauty'],
        metaKeywords: 'organic soap, handmade soap, natural beauty products'
      },
      { 
        id: 3, 
        name: 'Handmade Soap', 
        price: 8.99, 
        stock: 50, 
        category: 'Beauty', 
        image: 'https://images.unsplash.com/photo-1542038335240-86aea625b913?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        metaTitle: 'Organic Handmade Soap | Natural Beauty',
        metaDescription: 'Experience the luxury of our handmade organic soap. Gentle on skin, rich in lather, and made with all-natural ingredients.',
        tags: ['organic', 'handmade', 'soap', 'natural beauty'],
        metaKeywords: 'organic soap, handmade soap, natural beauty products'
      },
];

const ProductCard = ({ product, onEdit, onDelete }) => (
  <div className="bg-[#20232A] rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
    <div className="relative">
      <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
      <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 m-2 rounded-full text-xs font-bold">
        {product.category}
      </div>
    </div>
    <div className="p-4">
      <h3 className="text-xl font-semibold text-primary">{product.name}</h3>
      <div className="mt-2 flex justify-between items-center">
        <p className="text-2xl font-bold text-primary">${product.price.toFixed(2)}</p>
        <p className="text-sm text-gray-600 bg-gray-200 px-2 py-1 rounded-full">Stock: {product.stock}</p>
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <button onClick={() => onEdit(product)} className="text-primary hover:text-gray-600 transition duration-300">
          <Edit size={20} />
        </button>
        <button onClick={() => onDelete(product.id)} className="text-red-500 hover:text-red-700 transition duration-300">
          <Trash2 size={20} />
        </button>
      </div>
    </div>
  </div>
);

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
      metaKeywords: ''
    });
    const [loadingGen,setLoadingGen]=useState(false)
    const [loadingGenforTitle,setLoadingGenforTitle]=useState(false)
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prevData => ({
        ...prevData,
        [name]: name === 'tags' ? value.split(',').map(tag => tag.trim()) : value
      }));
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
    };
  
    const generateAI = (field) => {
      // Placeholder for AI generation
      console.log(`Generating AI content for ${field}`);
      // In a real implementation, this would call an API to generate content
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
        console.log("done",generatedText);
        
        setLoadingGen(false);
      };

      const generateAboutText = async (prompt) => {
        try {
          setLoadingGen(true);
          const API_KEY = 'AIzaSyAMKjcnhLfkHbvBBYrvcuBngcizr0FLc8Q';
          
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
            }),
          });
      
          // Check if the response is OK (status code in the range 200-299)
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
      
          const data = await response.json(); // Parse JSON response
          console.log("gemini", data);
          
          return data.candidates[0].content.parts[0].text; 
        } catch (error) {
          console.error("Error generating about text:", error);
          return '';
        } finally {
          setLoadingGen(false); // Uncomment if you're using loading state
        }
      };
      

    const handleGenerateClickforTitle = async () => {
        if (!formData.name) {
          alert("Please enter a valid catalog name before generating meta description.")
          return
        }
        setLoadingGenforTitle(true);
        const generatedText = await generateAboutText(`Generate a SEO ranked title for product : ${formData.name} in strictly less than 25 characters.`);
        if (generatedText) {
            setFormData(prevData => ({
              ...prevData,
              metaTitle: generatedText
            }));
            // alert("done")
            
          }
          console.log("done",generatedText);
          
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
        <div className="flex items-center">
          <input
            name="metaTitle"
            value={formData.metaTitle}
            onChange={handleChange}
            placeholder="Meta Tag Title"
            className="flex-grow p-3 border bg-gray-700 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            maxLength={50}
          />
          
        </div>
        <p className="text-sm text-primary">{formData.metaTitle.length}/50</p>
      </div>

      <div className="space-y-2">
      <div className='flex justify-between items-center'>
        <label className="block text-sm font-medium text-primary">Meta Tag Title</label>
        <button 
            type="button" 
            onClick={handleGenerateClick}
            className="p-1 text-primary rounded-lg hover:bg-gray-200 transition duration-300"
          >
            {loadingGen ? 'Generating...' : 'Generate through AI?'}
          </button>
        </div>
        <div className="flex items-center">
          <textarea
            name="metaDescription"
            value={formData.metaDescription}
            onChange={handleChange}
            placeholder="Meta Tag Description"
            className="flex-grow p-3 border bg-gray-700 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
            maxLength={250}
            rows={3}
          />
        </div>
        <p className="text-sm text-primary">{formData.metaDescription.length}/250</p>
      </div>


      <div>
        <label className="block text-sm font-medium text-primary p-1">Meta Tag Keywords</label>
        <input
          name="metaKeywords"
          value={formData.metaKeywords}
          onChange={handleChange}
          placeholder="Meta Tag Keywords"
          className="w-full p-3 border bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary p-1">Lifecycle of product</label>
        <input
          name="metaKeywords"
          value={formData.metaKeywords}
          onChange={handleChange}
          placeholder="Meta Tag Keywords"
          className="w-full p-3 border bg-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      

      <div className="flex justify-end space-x-2">
        <button type="button" onClick={onCancel} className="px-6 py-3 bg-gray-200 text-primary rounded-lg hover:bg-gray-300 transition duration-300">Cancel</button>
        <button type="submit" className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">Save</button>
      </div>
    </form>
  );
};

const SellerProducts = () => {
  const [products, setProducts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    // Simulating an API call to fetch seller's products
    setProducts(initialProducts);
  }, []);

  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentProduct(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    setCurrentProduct(product);
  };

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
  };

  const handleSave = (productData) => {
    if (currentProduct) {
      setProducts(products.map(p => p.id === currentProduct.id ? { ...p, ...productData } : p));
    } else {
      setProducts([...products, { ...productData, id: Date.now() }]);
    }
    setIsEditing(false);
  };

  return (
    <div className="md:ml-[14%] bg-black min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-primary flex items-center">
          <Package className="mr-4" size={36} />
          Manage Your Products
        </h1>
        {isEditing ? (
          <ProductForm product={currentProduct} onSave={handleSave} onCancel={() => setIsEditing(false)} />
        ) : (
          <>
            <button onClick={handleAddNew} className="mb-8 flex items-center text-primary px-6 py-3 rounded-lg hover:bg-gray-600 transition duration-300 shadow-md">
              <Plus size={24} className="mr-2" /> Add New Product
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {products.map(product => (
                <ProductCard key={product.id} product={product} onEdit={handleEdit} onDelete={handleDelete} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerProducts;