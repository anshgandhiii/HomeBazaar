import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const Button = ({ className, children, ...props }) => (
  <button
    className={`px-4 py-2 rounded-md transition duration-200 ease-in-out ${className}`}
    {...props}
  >
    {children}
  </button>
);

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-base-200">
    <div className="loader">Loading...</div>
  </div>
);

const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const validateCardDetails = (name, cardNumber, expiryDate, cvv) => {
    let errors = {};
    const namePattern = /^[A-Za-z\s]+$/;
    
    if (!namePattern.test(name)) {
      errors.name = 'Please enter a valid name without numeric characters.';
    }
    // Additional validation can be added here for card number, expiry, etc.
    
    return Object.keys(errors).length > 0 ? errors : null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
    });

    const { cardNumber, expiryDate, cvv, name } = paymentDetails;
    const validationErrors = validateCardDetails(name, cardNumber, expiryDate, cvv);

    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);

    // Simulate payment processing delay
    setTimeout(async () => {
      setLoading(false);

      await Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your order has been placed successfully. You will be notified when your order is out for delivery.',
      });

      navigate('/order-summary');
    }, 2000);
  };

  const orderDetails = {
    items: [
      { name: 'Wooden Chair', price: 79.99 },
      { name: 'Smart Watch', price: 199.99 },
    ],
    total: 279.98,
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold">Checkout</h2>
        <p className="text-base-content-600">Please review your order and complete the payment.</p>
      </div>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="md:order-2">
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            {orderDetails.items.map((item, index) => (
              <div key={index} className="flex justify-between mb-2">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold mt-4 text-lg">
              <span>Total</span>
              <span>${orderDetails.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Payment Form */}
          <div>
            <label className="block mb-1" htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={paymentDetails.name}
              onChange={handleChange}
              className="w-full p-2 border border-base-300 rounded-md"
              placeholder="John Doe"
              required
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}

            <label className="block mt-4 mb-1" htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={paymentDetails.cardNumber}
              onChange={handleChange}
              className="w-full p-2 border border-base-300 rounded-md"
              placeholder="1234 5678 9123 4567"
              required
            />
            {/* Add more error handling and fields like CVV, expiry */}
          </div>
        </div>

        <Button type="submit" className="mt-6 w-full bg-blue-500 text-white">
          Pay Now
        </Button>
      </form>

      <div className="mt-6 text-sm text-base-content">
        <AlertCircle size={24} className="inline mr-2" />
        Your payment information is secure and encrypted.
      </div>
    </div>
  );
};

export default PaymentPage;
