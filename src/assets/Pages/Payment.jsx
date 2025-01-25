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
  const [cardName, setCardName] = useState('');
  const [cardEmail, setCardEmail] = useState('');

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '4242 4242 4242 4242',
    cardHolder: bookingDetails?.name || '',
    expiryDate: '12/25',
    cvv: '',
  });

  const [isProcessing, setIsProcessing] = useState(false);

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

    setCardName(auth.currentUser.displayName || '');
    setCardEmail(auth.currentUser.email || '');
  }, [auth.currentUser, navigate, bookingDetails]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      if (!bookingDetails) {
        throw new Error('Booking details are missing');
      }

      const bookingData = {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        destination: bookingDetails.hotelName || 'Default Hotel', // Add hotel name here
        checkIn: bookingDetails.rawCheckIn || new Date(bookingDetails.checkIn).toISOString(),
        checkOut: bookingDetails.rawCheckOut || new Date(bookingDetails.checkOut).toISOString(),
        guests: Number(bookingDetails.guests),
        roomType: bookingDetails.roomType,
        contactInfo: {
          name: bookingDetails.name || 'John Doe',
          email: bookingDetails.email || auth.currentUser.email,
          phone: bookingDetails.phone || '+1234567890'
        },
        bookingDate: new Date().toISOString(),
        status: "pending",
        totalNights: Number(Math.ceil(
          (new Date(bookingDetails.checkOut) - new Date(bookingDetails.checkIn)) / 
          (1000 * 60 * 60 * 24)
        ))
      };

      // Validate the data before sending
      if (!bookingData.destination) {
        throw new Error('Destination is required');
      }

      console.log('Sending booking data:', bookingData);

      const response = await fetch('http://localhost:8000/api/bookings/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.detail || 'Failed to create booking');
      }

      const result = await response.json();
      console.log('API Response:', result);
      
      setIsProcessing(false);
      toast.success('Payment successful! Booking confirmed.');
      
      navigate('/booking-confirmation', { 
        state: { 
          bookingDetails: {
            ...bookingDetails,
            bookingId: result._id
          }
        }
      });
    } catch (error) {
      setIsProcessing(false);
      console.error('Booking error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    }
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Complete Your Booking
          </h1>
          <div className="flex items-center justify-center space-x-2 text-gray-600">
            <FaLock className="text-green-500" />
            <span className="text-sm font-medium">Secure Payment Processing</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-3xl shadow-xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4">
              <h2 className="text-xl font-bold text-white">Booking Summary</h2>
            </div>
            <div className="p-8">
              <div className="space-y-6">
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Hotel</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.hotelName}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Room Type</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.roomType}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Check-in</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.checkIn}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Check-out</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.checkOut}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-100">
                  <span className="text-gray-500">Guests</span>
                  <span className="font-semibold text-gray-800">{bookingDetails.guests}</span>
                </div>
                <div className="flex items-center justify-between py-4 bg-gray-50 rounded-xl px-4">
                  <span className="text-lg font-bold text-gray-800">Total Amount</span>
                  <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    ${bookingDetails.totalAmount}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-[1.02] transition-all duration-300">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Payment Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 block">Card Holder Name</label>
                <input
                  type="text"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 block">Email</label>
                <input
                  type="email"
                  value={cardEmail}
                  onChange={(e) => setCardEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-600 block">Card Number</label>
                <div className="relative">
                  <input
                    type="text"
                    value={paymentDetails.cardNumber}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\s/g, "").replace(/(\d{4})/g, "$1 ").trim();
                      setPaymentDetails({ ...paymentDetails, cardNumber: value });
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                    placeholder="1234 5678 9012 3456"
                    maxLength="19"
                    required
                  />
                  <FaCreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 block">Expiry Date</label>
                  <input
                    type="text"
                    value={paymentDetails.expiryDate}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, "").replace(/(\d{2})/, "$1/");
                      setPaymentDetails({ ...paymentDetails, expiryDate: value });
                    }}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                    placeholder="MM/YY"
                    maxLength="5"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-600 block">CVV</label>
                  <input
                    type="password"
                    value={paymentDetails.cvv}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none"
                    placeholder="123"
                    maxLength="3"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-xl 
                  hover:opacity-90 transition-all duration-300 font-semibold text-lg shadow-lg 
                  hover:shadow-blue-500/30 transform hover:-translate-y-0.5 mt-6 flex items-center justify-center"
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
  );
}