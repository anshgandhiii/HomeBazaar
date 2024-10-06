import React, { useState, useEffect } from 'react';
import { Phone, MapPin, Calendar, Users, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';

const ProfessionalDetails = () => {
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formProgress, setFormProgress] = useState(0);
  const [focusedField, setFocusedField] = useState(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    setShowForm(true);
    updateProgress();
  }, [phone, address, age, gender]);

  const updateProgress = () => {
    const fields = [phone, address, age, gender];
    const filledFields = fields.filter(field => field !== '').length;
    setFormProgress((filledFields / fields.length) * 100);
  };

  const handleInputChange = (setter) => (e) => {
    setter(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setSuccessMessage('Customer details successfully submitted.');
      setIsLoading(false);
    } catch (error) {
      setErrorMessage('An error occurred while submitting the form. Please try again.');
      setIsLoading(false);
    }
  };

  const isValidPhone = (phone) => {
    const phoneRegex = /^\d{10}$/;
    return phoneRegex.test(phone);
  };

  return (
    <div className="min-h-screen flex justify-center items-center  p-4">
      <div className={`w-full max-w-lg bg-base shadow-2xl rounded-2xl overflow-hidden transition-all duration-1000 ease-out transform ${showForm ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        <div className="p-8">
          <div className="space-y-2 mb-8">
            <h2 className="text-3xl font-bold text-base-content-800 animate-fadeIn">Customer Information</h2>
            <p className="text-sm text-base-content-600 animate-fadeIn animation-delay-200">Please provide the following details</p>
            <div className="w-full bg-base-200 rounded-full h-1.5 mt-4">
              <div 
                className="bg-blue-600 h-1.5 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${formProgress}%` }}
              ></div>
            </div>
          </div>
          <form onSubmit={handleFormSubmit} className="space-y-6">
            {[
              { label: 'Phone Number', value: phone, setter: setPhone, icon: Phone, placeholder: '1234567890', type: 'tel', validation: isValidPhone },
              { label: 'Address', value: address, setter: setAddress, icon: MapPin, placeholder: '1234 Main St, City, State, ZIP', type: 'textarea' },
              { label: 'Age', value: age, setter: setAge, icon: Calendar, placeholder: 'Your age', type: 'number', min: 1, max: 120 },
              { label: 'Gender', value: gender, setter: setGender, icon: Users, type: 'select', options: ['Male', 'Female', 'Non-Binary', 'Prefer not to say'] }
            ].map((field, index) => (
              <div key={index} className={`relative animate-fadeIn`} style={{ animationDelay: `${index * 200}ms` }}>
                <label className="block text-sm font-medium text-gray-700 mb-1">{field.label}</label>
                <div className="relative">
                  {field.type === 'select' ? (
                    <select
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 ${
                        focusedField === index ? 'border-blue-500' : 'border-gray-300'
                      }`}
                      value={field.value}
                      onChange={handleInputChange(field.setter)}
                      onFocus={() => setFocusedField(index)}
                      onBlur={() => setFocusedField(null)}
                      required
                    >
                      <option value="" disabled>Select {field.label}</option>
                      {field.options.map((option, i) => (
                        <option key={i} value={option}>{option}</option>
                      ))}
                    </select>
                  ) : field.type === 'textarea' ? (
                    <textarea
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 ${
                        focusedField === index ? 'border-blue-500' : 'border-gray-300'
                      }`}
                      value={field.value}
                      onChange={handleInputChange(field.setter)}
                      onFocus={() => setFocusedField(index)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      required
                      rows={3}
                    />
                  ) : (
                    <input
                      type={field.type}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-300 focus:border-blue-500 ${
                        focusedField === index ? 'border-blue-500' : 'border-gray-300'
                      } ${field.value && field.validation && !field.validation(field.value) ? 'border-red-500' : ''}`}
                      value={field.value}
                      onChange={handleInputChange(field.setter)}
                      onFocus={() => setFocusedField(index)}
                      onBlur={() => setFocusedField(null)}
                      placeholder={field.placeholder}
                      required
                      min={field.min}
                      max={field.max}
                    />
                  )}
                  <field.icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 transition-colors duration-300 ${
                    focusedField === index ? 'text-blue-500' : 'text-base-content-400'
                  }`} size={18} />
                  {field.validation && field.value && (
                    field.validation(field.value) 
                      ? <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 animate-scaleIn" size={18} />
                      : <AlertCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-red-500 animate-scaleIn" size={18} />
                  )}
                </div>
                {field.validation && field.value && !field.validation(field.value) && (
                  <p className="text-xs text-red-500 mt-1 animate-fadeIn">Please enter a valid {field.label.toLowerCase()}</p>
                )}
              </div>
            ))}
            <button
              type="submit"
              className={`w-full bg-base-600 hover:bg-blue-700 text-base-content font-semibold py-3 px-4 rounded-lg transition-all duration-300 ${
                formProgress === 100 ? 'animate-pulse' : 'opacity-50 cursor-not-allowed'
              } flex justify-center items-center animate-fadeIn animation-delay-800`}
              disabled={isLoading || formProgress !== 100}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={18} />
                  Submitting...
                </>
              ) : formProgress === 100 ? 'Submit' : 'Complete all fields'}
            </button>
          </form>
        </div>
        {(errorMessage || successMessage) && (
          <div className={`p-4 ${errorMessage ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'} flex items-center animate-slideIn`}>
            {errorMessage && <AlertCircle className="mr-2 flex-shrink-0" size={18} />}
            {successMessage && <CheckCircle className="mr-2 flex-shrink-0" size={18} />}
            <span>{errorMessage || successMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDetails;