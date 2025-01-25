import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Firebase/firebase.config';
import { toast } from 'react-toastify';
import { FaTrash, FaCalendarAlt, FaBed, FaUsers, FaDollarSign } from 'react-icons/fa';
import DarkNavbar from './DarkNavbar';

const UserBookings = () => {
  const [user] = useAuthState(auth);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    try {
      const response = await fetch(`http://localhost:8000/api/bookings/user/${user.uid}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to fetch bookings');
      }
      
      const data = await response.json();
      setBookings(data);
      
      // Calculate total amount
      const total = data.reduce((sum, booking) => sum + (booking.totalAmount || 0), 0);
      setTotalAmount(total);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast.error(error.message || 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    
    if (!bookingId) {
      console.error('Invalid booking ID');
      toast.error('Invalid booking ID');
      return;
    }

    

    try {
      const response = await fetch(`http://localhost:8000/api/bookings/${bookingId}`, {
        method: 'DELETE'
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Failed to delete booking');
      }

      setBookings(prevBookings => prevBookings.filter(booking => booking.id !== bookingId));
      toast.success('Booking cancelled successfully');
      
      const deletedBooking = bookings.find(b => b.id === bookingId);
      if (deletedBooking) {
        setTotalAmount(prev => prev - (deletedBooking.totalAmount || 0));
      }
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error(error.message || 'Failed to cancel booking');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <DarkNavbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex items-center space-x-4">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-16 h-16 rounded-full" />
            ) : (
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-2xl text-white font-bold">
                  {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                </span>
              </div>
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{user.displayName || 'Guest User'}</h2>
              <p className="text-gray-500">{user.email}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">{bookings.length}</p>
                </div>
                <FaCalendarAlt className="text-blue-500 text-2xl" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900">${totalAmount}</p>
                </div>
                <FaDollarSign className="text-green-500 text-2xl" />
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500">Active Bookings</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {bookings.filter(b => new Date(b.checkOut) > new Date()).length}
                  </p>
                </div>
                <FaBed className="text-purple-500 text-2xl" />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {bookings.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <FaCalendarAlt className="mx-auto text-4xl text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No bookings found</h3>
              <p className="text-gray-500">You haven't made any bookings yet.</p>
            </div>
          ) : (
            bookings.map((booking) => (
              <div key={booking._id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        {booking.destination}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-600 flex items-center">
                          <FaCalendarAlt className="mr-2 text-blue-500" />
                          {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <FaBed className="mr-2 text-purple-500" />
                          {booking.roomType}
                        </p>
                        <p className="text-gray-600 flex items-center">
                          <FaUsers className="mr-2 text-green-500" />
                          {booking.guests} Guests
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${booking.totalAmount}
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        {booking.totalNights} nights
                      </p>
                      <button
                        onClick={() => handleDeleteBooking(booking?.id)}
                        className="mt-4 flex items-center justify-center px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors duration-200"
                      >
                        <FaTrash className="mr-2" />
                        Cancel Booking
                      </button>
                    </div>
                  </div>
                </div>
                <div className={`px-6 py-3 ${
                  new Date(booking.checkOut) < new Date() 
                    ? 'bg-gray-100 text-gray-600'
                    : 'bg-green-50 text-green-600'
                }`}>
                  <p className="text-sm font-medium">
                    {new Date(booking.checkOut) < new Date() 
                      ? 'Completed'
                      : 'Active Booking'}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserBookings; 