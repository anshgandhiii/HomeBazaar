import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Package } from 'lucide-react';
import Cookies from "js-cookie"




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
          life_span: formData.life_span || 12,
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
              const errorData = await response.json(); // Try to read the error response
              throw new Error(`HTTP error! status: ${response.status}, details: ${JSON.stringify(errorData)}`);
          }
  
          const data = await response.json();
          console.log("Product added successfully:", data);
          // setProducts(prevProducts => [...prevProducts, data]);
          onSave(data);
      } catch (error) {
          console.error("Error adding product:", error);
          // Handle the error (e.g., show a notification)
      }
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
        className="w-full p-3 border bg-base-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        required
      />
      <input
        name="price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        placeholder="Price"
        className="w-full p-3 border bg-base-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        required
      />
      {/* <input
        name="life_span"
        type="number"
        value={formData.life_span}
        onChange={handleChange}
        placeholder="Stock"
        className="w-full p-3 border bg-base-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        required
      /> */}
      <input
        name="category"
        value={formData.category}
        onChange={handleChange}
        placeholder="Category"
        className="w-full p-3 border bg-base-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
            className="flex-grow p-3 border bg-base-700 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
            className="flex-grow p-3 border bg-base-700 border-gray-300 rounded-l-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
          className="w-full p-3 border bg-base-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-primary p-1">Lifecycle of product in *months*</label>
        <input
          name="life_span"
          type="number"
          value={formData.life_span}
          onChange={handleChange}
          placeholder="for carbon footprint"
          className="w-full p-3 border bg-base-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent"
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
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/user/products/', {
          method: 'GET', // Explicitly specify the GET method
          headers: {
            'Content-Type': 'application/json',
            // Adding the access token from cookies
            'Authorization': `Bearer ${Cookies.get('access_token')}`, // Fixing the syntax for template literals
          },
        });

        // Check if the response is okay
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`); // Correcting the error message syntax
        }

        const data = await response.json();
        console.log("Data:", data); // Log the fetched data
        
        setProducts(data); // Set the fetched data
      } catch (error) {
        console.log(error);
        
        // setError(error.message); // Set any fetching errors
      } finally {
        // setLoading(false); // Loading complete
      }
    };

    fetchProducts();
  }, []);// Empty dependency array to run only on mount

  
  const ProductCard = ({ product, onEdit, onDelete }) => {
    // Determine if the product is eco-friendly based on life_span
    const isEcoFriendly = product.life_span <= 12;
  
    return (
      <div 
        className={`rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 ${isEcoFriendly ? 'bg-green-900' : 'bg-base'}`}
      >
        <div className="relative">
          <img 
            src="https://media.istockphoto.com/id/115037368/photo/pieces-of-natural-soap.jpg?s=1024x1024&w=is&k=20&c=1eOMGEFNiNuMqjBD0oxxwvvdshDiOUaSxjY-7GM9IPY=" 
            alt={product.name} 
            className="w-full h-48 object-cover" 
          />
          <div className="absolute top-0 right-0 bg-primary text-base-content px-2 py-1 m-2 rounded-full text-xs font-bold">
            {product.category}
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold text-primary">{product.name}</h3>
          <span className='text-base-content'>Manufacturer: {product.manufacturer}</span>
          <div className="mt-2 flex justify-between items-center">
            <p className="text-sm text-primary bg-dark px-2 py-1 rounded-full">
              Life Span: {product.life_span} months
            </p>
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button onClick={() => onEdit(product)} className="text-primary hover:text-gray-600 transition duration-300">
              <Edit /> Edit
            </button>
            <button type="button" onClick={onCancel} className="w-full py-3 px-4 bg-gray-600 hover:bg-gray-700 rounded-lg text-white transition duration-300">
                Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  


  const handleAddNew = () => {
    setIsEditing(true);
    setCurrentProduct(null);
  };

  const handleEdit = (product) => {
    setIsEditing(true);
    // setCurrentProduct(product);
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
    <div className="md:ml-[14%] bg-base min-h-screen">
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
                <ProductCard key={product.id} product={product} onEdit={()=>handleEdit(product.id)} onDelete={()=>handleDelete(product.id)} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SellerProducts