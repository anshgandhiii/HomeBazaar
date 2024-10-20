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
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setErrors({
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      name: '',
    });

    // Validate card details
    const validationErrors = validateCardDetails(cardNumber, expiryDate, cvv, name);
    if (validationErrors) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true); // Show loading screen

    // Simulate payment processing delay
    setTimeout(async () => {
      // Show success popup
      const result = await Swal.fire({
        icon: 'success',
        title: 'Payment Successful',
        text: 'Your order has been placed successfully. You will be notified when your order is out for delivery.',

    
    // Validate payment details (simple validation for demonstration)
    if (!paymentDetails.name || !paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill in all fields!',

      });
      return;
    }
    // Check that the name contains only letters and spaces
    const namePattern = /^[A-Za-z\s]+$/; // Regex to allow only letters and spaces
    if (!namePattern.test(name)) {
        errors.name = 'Please enter a valid name without numeric characters.';
    }

    return Object.keys(errors).length > 0 ? errors : null;
  };

  const orderDetails = {
    items: [
      { name: 'Wooden Chair', price: 79.99 },
      { name: 'Smart Watch', price: 199.99 },
    ],
    total: 279.98,
  };

  if (loading) {
    return <LoadingScreen />; // Show loading screen while processing payment
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-base-content font-bold mr-2">1</div>
            <div className="w-16 h-1 bg-base-300 mr-2"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-base-content font-bold mr-2">2</div>
            <div className="w-16 h-1 bg-base-300 mr-2"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-base-content font-bold">3</div>
          </div>
        </div>
        <p className="text-base-content-600">Please review your order and complete the payment.</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card className="md:order-2">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
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

              <Button type="submit" className="bg-blue-500 text-white w-full">Pay Now</Button>
            </form>
            <div className="flex items-center mt-4 text-sm text-base-content-500">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>Your payment information is secure and encrypted</span>

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