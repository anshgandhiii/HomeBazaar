import React, { useState } from 'react';
import { AlertCircle, CreditCard, Calendar, User } from 'lucide-react';
import Swal from 'sweetalert2'; // Import SweetAlert2
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Simple UI component definitions
const Card = ({ children, className }) => (
  <div className={`bg-white shadow-md rounded-lg ${className}`}>{children}</div>
);
const CardHeader = ({ children }) => <div className="p-4 border-b">{children}</div>;
const CardTitle = ({ children }) => <h3 className="text-lg font-semibold">{children}</h3>;
const CardContent = ({ children }) => <div className="p-4">{children}</div>;
const Input = ({ className, ...props }) => (
  <input
    className={`w-full p-2 border rounded-md ${className}`}
    {...props}
  />
);
const Button = ({ className, children, ...props }) => (
  <button
    className={`p-2 rounded-md text-white ${className}`}
    {...props}
  >
    {children}
  </button>
);

const LoadingScreen = () => (
  <div className="flex items-center justify-center h-screen bg-gray-200">
    <div className="loader">Loading...</div>
  </div>
);

const FinalPaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false); // New loading state

  // State variables for error messages
  const [errors, setErrors] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    name: '',
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleSubmit = async (e) => {
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
        text: 'You will be notified shortly.',
      });

      if (result.isConfirmed) {
        // Redirect to home page after a slight delay
        navigate('/consumer/home');
      }
      setLoading(false); // Hide loading screen
    }, 3000); // Simulate processing time (3 seconds)
  };

  const validateCardDetails = (cardNumber, expiryDate, cvv, name) => {
    const cardNumberPattern = /^\d{16}$/; // Adjust based on your card number length
    const cvvPattern = /^\d{3}$/;

    // Split MM/YY and validate
    const [month, year] = expiryDate.split('/');
    const expiryPattern = /^(0[1-9]|1[0-2])\/?([0-9]{2})$/; // MM/YY format
    const isValidExpiry = expiryPattern.test(expiryDate) && (
        new Date(`20${year}`, month - 1) > new Date()
    );

    const errors = {};
    if (!cardNumberPattern.test(cardNumber)) {
        errors.cardNumber = 'Please enter a valid 16-digit card number.';
    }
    if (!isValidExpiry) {
        errors.expiryDate = 'Please enter a valid expiration date in MM/YY format that is in the future.';
    }
    if (!cvvPattern.test(cvv)) {
        errors.cvv = 'Please enter a valid 3-digit CVV.';
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
      { name: 'Product 1', price: 19.99 },
      { name: 'Product 2', price: 29.99 },
    ],
    total: 49.98,
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
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2">1</div>
            <div className="w-16 h-1 bg-gray-300 mr-2"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold mr-2">2</div>
            <div className="w-16 h-1 bg-gray-300 mr-2"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
          </div>
        </div>
        <p className="text-gray-600">Please review your order and complete the payment.</p>
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
          </CardContent>
        </Card>

        <Card className="md:order-1">
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <CreditCard className="absolute top-3 left-3 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Card Number"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                  className="pl-10"
                  pattern="\d{16}" // Accepts exactly 16 digits
                  title="Please enter a valid 16-digit card number." // Error message on invalid input
                />
                {errors.cardNumber && <p className="text-red-500 text-sm">{errors.cardNumber}</p>} {/* Error message */}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative">
                  <Calendar className="absolute top-3 left-3 text-gray-400" size={20} />
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                    className="pl-10"
                    pattern="^(0[1-9]|1[0-2])\/?([0-9]{2})$" // MM/YY format
                    title="Please enter a valid expiration date in MM/YY format." // Error message on invalid input
                  />
                  {errors.expiryDate && <p className="text-red-500 text-sm">{errors.expiryDate}</p>} {/* Error message */}
                </div>
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    required
                    pattern="\d{3}" // Accepts exactly 3 digits
                    title="Please enter a valid 3-digit CVV." // Error message on invalid input
                  />
                  {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>} {/* Error message */}
                </div>
              </div>
              <div className="relative">
                <User className="absolute top-3 left-3 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Cardholder Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10"
                />
                {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>} {/* Error message */}
              </div>
              <Button type="submit" className="bg-blue-500 w-full">Pay Now</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinalPaymentPage;
