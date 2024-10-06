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

const Card = ({ children, className }) => (
  <div className={`bg-base-200 p-6 rounded-lg shadow-md ${className}`}>
    {children}
  </div>
);

const PaymentPage = () => {
  const [paymentDetails, setPaymentDetails] = useState({
    name: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simulate payment processing delay
    setTimeout(async () => {
      // Show success popup
      await Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your order has been placed successfully. You will be notified when your order is out for delivery.',
      });

      navigate('/thank-you'); // Redirect to thank you page
    }, 1000); // Simulate a delay of 1 second for processing
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-base rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold mb-8 text-base-content">Complete Your Payment</h1>
      
      <Card>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label className="block text-base-content mb-1" htmlFor="name">Name on Card</label>
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
            </div>
            <div>
              <label className="block text-base-content mb-1" htmlFor="cardNumber">Card Number</label>
              <input 
                type="text" 
                id="cardNumber" 
                name="cardNumber" 
                value={paymentDetails.cardNumber} 
                onChange={handleChange} 
                className="w-full p-2 border border-base-300 rounded-md"
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-base-content mb-1" htmlFor="expiryDate">Expiry Date</label>
                <input 
                  type="text" 
                  id="expiryDate" 
                  name="expiryDate" 
                  value={paymentDetails.expiryDate} 
                  onChange={handleChange} 
                  className="w-full p-2 border border-base-300 rounded-md"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <label className="block text-base-content mb-1" htmlFor="cvv">CVV</label>
                <input 
                  type="text" 
                  id="cvv" 
                  name="cvv" 
                  value={paymentDetails.cvv} 
                  onChange={handleChange} 
                  className="w-full p-2 border border-base-300 rounded-md"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <Button type="submit" className="mt-6 w-full bg-primary text-primary-content hover:bg-primary-focus">
              Pay Now
            </Button>

            {/* Security Note */}
            <div className="flex items-center mt-4 text-sm text-base-content">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>Your payment information is secure and encrypted.</span>
            </div>
          </div>
        </form>
      </Card>

      {/* Additional Information */}
      <div className="mt-6 text-base-content">
        Your payment information is secure and will not be shared.
      </div>
    </div>
  );
};

export default PaymentPage;