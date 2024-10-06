import React, { useState } from 'react';
import { AlertCircle, CreditCard, Calendar, User } from 'lucide-react';

// Since we don't have access to the specific UI components, let's create simple versions
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
    className={`p-2 rounded-md text-base-base-content ${className}`}
    {...props}
  >
    {children}
  </button>
);

const FinalPaymentPage = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Payment submitted');
  };

  const orderDetails = {
    items: [
      { name: 'Product 1', price: 19.99 },
      { name: 'Product 2', price: 29.99 },
    ],
    total: 49.98,
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-4">
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Checkout</h2>
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-base-content font-bold mr-2">1</div>
            <div className="w-16 h-1 bg-gray-300 mr-2"></div>
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-base-content font-bold mr-2">2</div>
            <div className="w-16 h-1 bg-gray-300 mr-2"></div>
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
                />
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
                  />
                </div>
                <Input
                  type="text"
                  placeholder="CVV"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <User className="absolute top-3 left-3 text-gray-400" size={20} />
                <Input
                  type="text"
                  placeholder="Name on Card"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="pl-10"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600">
                Pay ${orderDetails.total.toFixed(2)}
              </Button>
            </form>
            <div className="flex items-center mt-4 text-sm text-base-content-500">
              <AlertCircle className="w-4 h-4 mr-2" />
              <span>Your payment information is secure and encrypted</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default FinalPaymentPage;