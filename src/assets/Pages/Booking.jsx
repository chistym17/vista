import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { toast } from 'react-toastify';
import "react-datepicker/dist/react-datepicker.css";
import 'react-toastify/dist/ReactToastify.css';
import DarkNavbar from './DarkNavbar';
import { getAuth } from 'firebase/auth';

const Booking = () => {
  const { destination } = useParams();
  console.log(destination)
  const navigate = useNavigate();
  const auth = getAuth();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    guests: 1,
    roomType: 'standard'
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!auth.currentUser) {
      toast.error('Please login to complete your booking');
      navigate('/login');
      return;
    }

    if (!startDate || !endDate) {
      toast.error('Please select check-in and check-out dates');
      return;
    }

    if (!formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields');
      return;
    }

    try {
      // Prepare booking data
      const bookingData = {
        userId: auth.currentUser.uid,
        userEmail: auth.currentUser.email,
        destination: destination.replace(/-/g, ' '),
        checkIn: startDate.toISOString(),
        checkOut: endDate.toISOString(),
        guests: formData.guests,
        roomType: formData.roomType,
        contactInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        },
        bookingDate: new Date().toISOString(),
        status: 'pending',
        totalNights: Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24))
      };

      // Make API request to backend
      const response = await fetch('http://localhost:5000/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${await auth.currentUser.getIdToken()}`
        },
        body: JSON.stringify(bookingData)
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const result = await response.json();

      // Show success message
      toast.success('Booking completed successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      // Navigate to payment with booking details
      navigate('/payment', { 
        state: { 
          bookingDetails: {
            bookingId: result.bookingId,
            destination: destination,
            checkIn: startDate.toLocaleDateString(),
            checkOut: endDate.toLocaleDateString(),
            guests: formData.guests,
            roomType: formData.roomType,
            totalAmount: result.totalAmount || 299, // Use the amount from backend or fallback
            name: formData.name,
            email: formData.email
          }
        }
      });
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to complete booking. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ffe4b5] to-[#ffd700]">
      <DarkNavbar />
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2 font-bebo">
            Book Your Stay
          </h1>
          <div className="bg-white/80 backdrop-blur-sm py-3 px-6 rounded-lg inline-block shadow-lg">
            <h2 className="text-2xl text-orange-600 font-semibold capitalize">
              {destination.replace(/-/g, ' ')}
            </h2>
          </div>
        </div>
        
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-2xl p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Check-in Date</label>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  selectsStart
                  startDate={startDate}
                  endDate={endDate}
                  minDate={new Date()}
                  className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholderText="Select check-in date"
                />
              </div>
              
              <div className="relative">
                <label className="block text-gray-700 font-semibold mb-2">Check-out Date</label>
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  selectsEnd
                  startDate={startDate}
                  endDate={endDate}
                  minDate={startDate}
                  className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  placeholderText="Select check-out date"
                />
              </div>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="John Doe"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="john@example.com"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="+880 1XX-XXXXXXX"
                    onChange={handleInputChange}
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Number of Guests</label>
                  <input
                    type="number"
                    name="guests"
                    min="1"
                    required
                    className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                    placeholder="2"
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 font-semibold mb-2">Room Type</label>
                <select
                  name="roomType"
                  className="w-full p-3 border-2 border-orange-200 rounded-lg focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none transition-all"
                  onChange={handleInputChange}
                >
                  <option value="standard">Standard Room</option>
                  <option value="deluxe">Deluxe Room</option>
                  <option value="suite">Suite</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg shadow-lg transform transition-all hover:scale-[1.02] focus:scale-[0.98]"
            >
              Complete Booking
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Booking;
