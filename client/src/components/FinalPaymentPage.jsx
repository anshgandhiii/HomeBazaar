import React, { useState } from 'react';
import { AlertCircle, CreditCard, Calendar, User } from 'lucide-react';
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate payment details (simple validation for demonstration)
    if (!paymentDetails.name || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',
      });
      return;
    }

    // Proceed with payment processing logic here...

    Swal.fire({
      icon: 'success',
      title: 'Payment Successful!',
      text: 'Thank you for your purchase!',
    }).then(() => {
      navigate('/thank-you'); // Redirect to thank you page
    });
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
          </div>

          <Button type="submit" className="mt-6 w-full bg-primary text-primary-content hover:bg-primary-focus">
            Pay Now
          </Button>
        </form>
      </Card>

      {/* Additional Information */}
      <div className="mt-6 text-base-content">
        <AlertCircle size={24} className="inline mr-2" />
        Your payment information is secure and will not be shared.
      </div>
    </div>
  );
};

export default PaymentPage;