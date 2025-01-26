// src/Pages/BookingConfirmation.jsx
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaCheckCircle, FaHotel, FaCalendar, FaUsers, FaCreditCard, FaCalendarAlt } from 'react-icons/fa';

export default function BookingConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { bookingDetails, paymentId } = location.state || {};

  if (!bookingDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Invalid Booking Session</h2>
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
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-green-100 rounded-full mb-4">
              <FaCheckCircle className="text-5xl text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600">
              Thank you for your booking. Your reservation has been confirmed.
            </p>
          </div>

          {/* Booking Details Card */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <div className="border-b pb-4 mb-4">
              <h2 className="text-xl font-bold text-gray-800">Booking Details</h2>
              <p className="text-sm text-gray-500">Booking ID: {paymentId}</p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start space-x-3">
                <FaHotel className="text-blue-500 mt-1" />
                <div>
                  <p className="font-semibold">{bookingDetails.hotelName}</p>
                  <p className="text-gray-600">{bookingDetails.roomType}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaCalendar className="text-blue-500 mt-1" />
                <div>
                  <p className="font-semibold">Stay Duration</p>
                  <p className="text-gray-600">Check-in: {bookingDetails.checkIn}</p>
                  <p className="text-gray-600">Check-out: {bookingDetails.checkOut}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaUsers className="text-blue-500 mt-1" />
                <div>
                  <p className="font-semibold">Guests</p>
                  <p className="text-gray-600">{bookingDetails.guests} guests</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <FaCreditCard className="text-blue-500 mt-1" />
                <div>
                  <p className="font-semibold">Payment</p>
                  <p className="text-gray-600">Total Amount: ${bookingDetails.totalAmount}</p>
                  <p className="text-sm text-gray-500">Transaction ID: {paymentId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 
                transition-colors font-medium text-sm text-center"
            >
              Return to Home
            </button>
            <button
              onClick={() => navigate('/my-bookings')}
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 
                transition-colors font-medium text-sm text-center flex items-center justify-center"
            >
              <FaCalendarAlt className="mr-2" />
              Show My Bookings
            </button>
            <button
              onClick={() => window.print()}
              className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-200 
                transition-colors font-medium text-sm text-center"
            >
              Print Confirmation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}