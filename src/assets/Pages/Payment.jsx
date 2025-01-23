// src/Pages/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaRegClock } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';

export default function Payment() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const bookingDetails = location.state?.bookingDetails;

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '4242 4242 4242 4242',
    cardHolder: bookingDetails?.name || '',
    expiryDate: '12/25',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Check authentication status when component mounts
  useEffect(() => {
    if (!auth.currentUser) {
      toast.error('Please login or register to complete your booking');
      navigate('/register', { 
        state: { 
          redirectUrl: '/payment',
          bookingDetails: bookingDetails 
        }
      });
      return;
    }
  }, [auth.currentUser, navigate, bookingDetails]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      toast.success('Payment successful! Booking confirmed.');
      navigate('/booking-confirmation', { 
        state: { 
          bookingDetails,
          paymentId: 'PAY-' + Math.random().toString(36).substr(2, 9).toUpperCase()
        }
      });
    }, 2000);
  };

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Payment Session</h2>
          <p className="text-gray-600 mb-4">No booking details found.</p>
          <button
            onClick={() => navigate('/')}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Return Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Payment Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Complete Your Payment</h1>
            <div className="flex items-center justify-center space-x-2 text-blue-600">
              <FaLock />
              <span className="text-sm">Secure Payment Processing</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Booking Summary */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Booking Summary</h2>
              <div className="space-y-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Hotel</span>
                  <span className="font-medium">{bookingDetails.hotelName}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Room Type</span>
                  <span className="font-medium">{bookingDetails.roomType}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Check-in</span>
                  <span className="font-medium">{bookingDetails.checkIn}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Check-out</span>
                  <span className="font-medium">{bookingDetails.checkOut}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-600">Guests</span>
                  <span className="font-medium">{bookingDetails.guests}</span>
                </div>
                <div className="flex justify-between py-2 font-bold text-lg">
                  <span>Total Amount</span>
                  <span className="text-blue-600">${bookingDetails.totalAmount}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Payment Details</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Card Number</label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      maxLength="19"
                      value={paymentDetails.cardNumber}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
                        setPaymentDetails({ ...paymentDetails, cardNumber: value });
                      }}
                      required
                    />
                    <FaCreditCard className="absolute right-3 top-3 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-700 mb-2">Card Holder Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                    value={paymentDetails.cardHolder}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardHolder: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Expiry Date</label>
                    <input
                      type="text"
                      placeholder="MM/YY"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      maxLength="5"
                      value={paymentDetails.expiryDate}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").replace(/(\d{2})/, "$1/");
                        setPaymentDetails({ ...paymentDetails, expiryDate: value });
                      }}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">CVV</label>
                    <input
                      type="password"
                      placeholder="123"
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                      maxLength="3"
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                    transition-colors font-semibold text-lg flex items-center justify-center"
                  disabled={isProcessing}
                >
                  {isProcessing ? (
                    <>
                      <FaRegClock className="animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    `Pay $${bookingDetails.totalAmount}`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}