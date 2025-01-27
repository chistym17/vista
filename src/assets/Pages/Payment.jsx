// src/Pages/Payment.jsx
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCreditCard, FaLock, FaRegClock, FaUser, FaEnvelope, FaCalendarAlt } from 'react-icons/fa';
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

      if (!bookingData.destination) {
        throw new Error('Destination is required');
      }

      console.log('Sending booking data:', bookingData);

      const response = await fetch('https://vista-backend-reqg.onrender.com/api/bookings/', {
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
            bookingId: result._id,
            showBookingsButton: true
          }
        }
      });
    } catch (error) {
      setIsProcessing(false);
      console.error('Booking error:', error);
      toast.error(error.message || 'Payment failed. Please try again.');
    }
  };

  const UserProfileBox = () => {
    if (!auth.currentUser) return null;

    return (
      <div className="mb-8 bg-white rounded-xl shadow-lg p-6 transform hover:scale-[1.02] transition-all duration-300">
        <div className="flex items-center space-x-4">
          {auth.currentUser.photoURL ? (
            <img
              src={auth.currentUser.photoURL}
              alt="Profile"
              className="w-16 h-16 rounded-full border-4 border-blue-100"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
              <span className="text-2xl text-white font-bold">
                {auth.currentUser.displayName?.[0] || auth.currentUser.email?.[0].toUpperCase()}
              </span>
            </div>
          )}
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold text-gray-800">
                {auth.currentUser.displayName || 'Guest User'}
              </h3>
              <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                Verified
              </span>
            </div>
            <p className="text-gray-500 flex items-center mt-1">
              <FaEnvelope className="mr-2 text-gray-400" />
              {auth.currentUser.email}
            </p>
            <div className="mt-3 flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Member since {new Date(auth.currentUser.metadata.creationTime).toLocaleDateString()}
              </span>
              <span className="h-1 w-1 bg-gray-300 rounded-full"></span>
              <span className="text-sm text-blue-600 font-medium">
                {bookingDetails?.totalAmount ? `$${bookingDetails.totalAmount} pending payment` : 'No pending payments'}
              </span>
            </div>
          </div>
        </div>
      </div>
    );
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
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - User Profile */}
          <div className="lg:w-1/3">
            <UserProfileBox />

            {/* Booking Summary */}
            <div className="mt-6 bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">
                Booking Summary
              </h3>
              <div className="grid grid-cols-1 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Destination</p>
                  <p className="font-medium">{bookingDetails?.destination}</p>
                </div>
                <div>
                  <p className="text-gray-600">Room Type</p>
                  <p className="font-medium">{bookingDetails?.roomType}</p>
                </div>
                <div>
                  <p className="text-gray-600">Check-in</p>
                  <p className="font-medium">{bookingDetails?.checkIn}</p>
                </div>
                <div>
                  <p className="text-gray-600">Check-out</p>
                  <p className="font-medium">{bookingDetails?.checkOut}</p>
                </div>
                <div className="pt-4 border-t">
                  <p className="text-gray-600">Total Amount</p>
                  <p className="font-semibold text-lg text-blue-600">
                    ${bookingDetails?.totalAmount}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Payment Form */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Complete Your Payment
              </h2>

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
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : (
                    `Pay $${bookingDetails?.totalAmount || 0}`
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