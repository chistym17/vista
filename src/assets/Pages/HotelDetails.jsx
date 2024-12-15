// src/Pages/HotelDetails.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaStar, FaWifi, FaParking, FaSwimmingPool, FaCoffee, FaMapMarkerAlt, FaUtensils, FaGlassMartini, FaSpa, FaConciergeBell, FaUmbrella } from 'react-icons/fa';
import { toast } from 'react-toastify';

const hotelsData = [
  {
    id: 1,
    name: "Royal Tulip Sea Pearl Beach Resort",
    location: "Cox's Bazar",
    rating: 4.8,
    price: "$299",
    image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      "https://images.pexels.com/photos/261105/pexels-photo-261105.jpeg",
      "https://images.pexels.com/photos/261106/pexels-photo-261106.jpeg",
    ],
    amenities: [
      { name: "Free WiFi", icon: <FaWifi /> },
      { name: "Swimming Pool", icon: <FaSwimmingPool /> },
      { name: "Spa Center", icon: <FaSpa /> },
      { name: "Restaurant", icon: <FaUtensils /> },
      { name: "Bar & Lounge", icon: <FaGlassMartini /> },
      { name: "24/7 Room Service", icon: <FaConciergeBell /> },
    ],
    description: "Luxury beachfront resort with stunning ocean views",
    fullDescription: `Royal Tulip Sea Pearl Beach Resort is a luxurious 5-star property located along the pristine beaches of Cox's Bazar. The resort offers an unparalleled blend of comfort, luxury, and natural beauty.

    Our rooms and suites are designed to provide the ultimate comfort with modern amenities and breathtaking ocean views. Each room features premium bedding, private balconies, and state-of-the-art facilities.

    The resort boasts multiple dining options serving international and local cuisine, a world-class spa, infinity pools overlooking the Bay of Bengal, and direct beach access.`,
    rooms: [
      {
        type: "Deluxe Ocean View",
        price: "$299",
        capacity: "2 Adults + 1 Child",
        size: "45 sq m",
        features: ["Ocean View", "Private Balcony", "King Bed", "Rain Shower"]
      },
      {
        type: "Premium Suite",
        price: "$499",
        capacity: "3 Adults + 1 Child",
        size: "75 sq m",
        features: ["Panoramic View", "Living Room", "Jacuzzi", "Club Access"]
      },
      {
        type: "Royal Villa",
        price: "$899",
        capacity: "4 Adults + 2 Children",
        size: "120 sq m",
        features: ["Private Pool", "Butler Service", "Ocean Front", "Kitchen"]
      }
    ],
    dining: [
      {
        name: "Ocean Vista Restaurant",
        cuisine: "International Buffet",
        timing: "6:30 AM - 10:30 PM"
      },
      {
        name: "Coral Bar & Grill",
        cuisine: "Seafood & BBQ",
        timing: "12:00 PM - 11:00 PM"
      }
    ],
    reviews: [
      {
        user: "John D.",
        rating: 5,
        comment: "Exceptional service and beautiful location. The rooms are spacious and clean."
      },
      {
        user: "Sarah M.",
        rating: 4.5,
        comment: "Great amenities and friendly staff. The beach access is perfect."
      }
    ],
    policies: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      children: "Children of all ages are welcome",
      pets: "No pets allowed"
    }
  },
  {
    id: 2,
    name: "Pan Pacific Sonargaon",
    location: "Dhaka",
    rating: 4.9,
    price: "$259",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
      "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg",
      "https://images.pexels.com/photos/260932/pexels-photo-260932.jpeg",
    ],
    amenities: [
      { name: "Free WiFi", icon: <FaWifi /> },
      { name: "Swimming Pool", icon: <FaSwimmingPool /> },
      { name: "Fine Dining", icon: <FaUtensils /> },
      { name: "Spa Center", icon: <FaSpa /> },
      { name: "24/7 Service", icon: <FaConciergeBell /> },
      { name: "Premium Bar", icon: <FaGlassMartini /> },
    ],
    description: "5-star luxury in the heart of the city",
    fullDescription: `Pan Pacific Sonargaon Dhaka stands as an icon of luxury and sophistication in Bangladesh's capital. This 5-star hotel combines traditional Bengali hospitality with modern luxury amenities.

    The hotel features elegantly appointed rooms and suites, each designed with a perfect blend of comfort and style. Guests can enjoy panoramic views of the city skyline while experiencing world-class service.

    Our award-winning restaurants offer an extensive range of local and international cuisine, while our state-of-the-art fitness center and spa provide the perfect retreat for relaxation.`,
    rooms: [
      {
        type: "Deluxe City View",
        price: "$259",
        capacity: "2 Adults",
        size: "40 sq m",
        features: ["City View", "Mini Bar", "King Bed", "Work Desk"]
      },
      {
        type: "Executive Suite",
        price: "$399",
        capacity: "2 Adults + 1 Child",
        size: "65 sq m",
        features: ["Lounge Access", "Separate Living Area", "Premium Amenities", "Butler Service"]
      },
      {
        type: "Presidential Suite",
        price: "$799",
        capacity: "4 Adults",
        size: "120 sq m",
        features: ["Panoramic View", "Dining Room", "Private Bar", "VIP Services"]
      }
    ],
    dining: [
      {
        name: "Café Bazar",
        cuisine: "International Buffet",
        timing: "6:00 AM - 11:00 PM"
      },
      {
        name: "Jharna Grill",
        cuisine: "Fine Dining",
        timing: "7:00 PM - 11:00 PM"
      }
    ],
    reviews: [
      {
        user: "Michael R.",
        rating: 5,
        comment: "Impeccable service and fantastic location. The staff went above and beyond."
      },
      {
        user: "Lisa T.",
        rating: 4.8,
        comment: "Luxurious rooms and excellent dining options. A true 5-star experience."
      }
    ],
    policies: {
      checkIn: "3:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 48 hours before check-in",
      children: "Children welcome with extra bed charges",
      pets: "No pets allowed"
    }
  },
  {
    id: 3,
    name: "Long Beach Hotel",
    location: "Cox's Bazar",
    rating: 4.7,
    price: "$199",
    image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/261103/pexels-photo-261103.jpeg",
      "https://images.pexels.com/photos/261104/pexels-photo-261104.jpeg",
      "https://images.pexels.com/photos/261105/pexels-photo-261105.jpeg",
    ],
    amenities: [
      { name: "Free WiFi", icon: <FaWifi /> },
      { name: "Beach Access", icon: <FaUmbrella /> },
      { name: "Pool", icon: <FaSwimmingPool /> },
      { name: "Restaurant", icon: <FaUtensils /> },
      { name: "Room Service", icon: <FaConciergeBell /> },
      { name: "Spa", icon: <FaSpa /> },
    ],
    description: "Modern comfort meets seaside charm",
    fullDescription: `Long Beach Hotel offers a perfect blend of modern amenities and beachfront luxury in Cox's Bazar. Located right on the world's longest natural beach, our hotel provides guests with unforgettable views and experiences.

    Each room is designed to maximize comfort and beach views, featuring contemporary furnishings and private balconies. The hotel's architecture combines modern design with local cultural elements.

    Our facilities include multiple swimming pools, a private beach area, and various dining options serving both local and international cuisine.`,
    rooms: [
      {
        type: "Superior Beach View",
        price: "$199",
        capacity: "2 Adults",
        size: "35 sq m",
        features: ["Beach View", "Balcony", "Twin/King Bed", "Sea Breeze"]
      },
      {
        type: "Deluxe Ocean Suite",
        price: "$299",
        capacity: "3 Adults",
        size: "55 sq m",
        features: ["Ocean View", "Living Area", "Premium Bathroom", "Lounge Access"]
      },
      {
        type: "Beach Villa",
        price: "$599",
        capacity: "4 Adults + 2 Children",
        size: "100 sq m",
        features: ["Private Garden", "Direct Beach Access", "Kitchen", "BBQ Area"]
      }
    ],
    dining: [
      {
        name: "Waves Restaurant",
        cuisine: "Seafood & International",
        timing: "7:00 AM - 11:00 PM"
      },
      {
        name: "Beach Café",
        cuisine: "Light Meals & Beverages",
        timing: "10:00 AM - 12:00 AM"
      }
    ],
    reviews: [
      {
        user: "David K.",
        rating: 4.7,
        comment: "Perfect beach location with excellent amenities. Great value for money."
      },
      {
        user: "Emma P.",
        rating: 4.6,
        comment: "Beautiful views and friendly staff. The beach access is amazing."
      }
    ],
    policies: {
      checkIn: "2:00 PM",
      checkOut: "11:00 AM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      children: "Children under 5 stay free",
      pets: "No pets allowed"
    }
  },
  {
    id: 4,
    name: "Radisson Blu Chattogram",
    location: "Chattogram",
    rating: 4.8,
    price: "$279",
    image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/260922/pexels-photo-260922.jpeg",
      "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg",
      "https://images.pexels.com/photos/260932/pexels-photo-260932.jpeg",
    ],
    amenities: [
      { name: "Free WiFi", icon: <FaWifi /> },
      { name: "Swimming Pool", icon: <FaSwimmingPool /> },
      { name: "Fine Dining", icon: <FaUtensils /> },
      { name: "Spa Center", icon: <FaSpa /> },
      { name: "24/7 Service", icon: <FaConciergeBell /> },
      { name: "Premium Bar", icon: <FaGlassMartini /> },
    ],
    description: "Luxury urban retreat in the heart of Chattogram",
    fullDescription: `Radisson Blu Chattogram stands as a beacon of luxury and sophistication in the port city. This 5-star hotel combines contemporary design with world-class amenities to create an unforgettable stay experience.

    Our hotel features elegantly appointed rooms and suites with panoramic city views, each thoughtfully designed to provide maximum comfort and luxury. Modern furnishings, premium bedding, and state-of-the-art technology ensure a perfect stay for both business and leisure travelers.

    The hotel's strategic location in the heart of Chattogram provides easy access to key business districts and popular attractions. Our world-class facilities include:
    - Multiple award-winning restaurants
    - Rooftop infinity pool with city views
    - Full-service spa and wellness center
    - Modern fitness center
    - Executive lounge with panoramic views
    - State-of-the-art meeting and event spaces`,
    rooms: [
      {
        type: "Superior City View",
        price: "$279",
        capacity: "2 Adults",
        size: "42 sq m",
        features: ["City View", "Rain Shower", "Smart TV", "Executive Workspace"]
      },
      {
        type: "Business Class Suite",
        price: "$459",
        capacity: "2 Adults + 1 Child",
        size: "68 sq m",
        features: ["Lounge Access", "Butler Service", "Living Room", "Premium Amenities"]
      },
      {
        type: "Presidential Suite",
        price: "$899",
        capacity: "4 Adults",
        size: "125 sq m",
        features: ["Panoramic View", "Private Dining", "Meeting Room", "Luxury Bathroom"]
      }
    ],
    dining: [
      {
        name: "The Core Dining",
        cuisine: "International & Asian Fusion",
        timing: "6:00 AM - 11:00 PM"
      },
      {
        name: "Mezetto",
        cuisine: "Mediterranean & Grill",
        timing: "12:00 PM - 11:00 PM"
      },
      {
        name: "Sky View Bar",
        cuisine: "Cocktails & Light Bites",
        timing: "4:00 PM - 12:00 AM"
      }
    ],
    reviews: [
      {
        user: "Robert H.",
        rating: 5,
        comment: "Outstanding service and facilities. The business class suite exceeded all expectations."
      },
      {
        user: "Amanda W.",
        rating: 4.8,
        comment: "Perfect location for business travelers. The executive lounge is exceptional."
      },
      {
        user: "James K.",
        rating: 4.9,
        comment: "Incredible dining options and the rooftop pool offers stunning city views."
      }
    ],
    policies: {
      checkIn: "2:00 PM",
      checkOut: "12:00 PM",
      cancellation: "Free cancellation up to 24 hours before check-in",
      children: "Children under 12 stay free with existing bedding",
      pets: "No pets allowed",
      extraBed: "Extra bed available on request (charges apply)",
      smoking: "Non-smoking rooms available",
      payment: "All major credit cards accepted"
    }
}
];

export default function HotelDetails() {
  const { id } = useParams();
  const hotel = hotelsData.find(h => h.id === parseInt(id));
  const navigate = useNavigate();
  // Get today's date and tomorrow's date for default values
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const formatDate = (date) => {
    return date.toISOString().split('T')[0];
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [bookingData, setBookingData] = useState({
    checkIn: formatDate(today),
    checkOut: formatDate(tomorrow),
    guests: 2,
    roomType: hotel?.rooms[0]?.type || '', // Default to first room type
    name: 'John Doe', // Default name
    email: 'john.doe@example.com', // Default email
    phone: '+880 1700000000' // Default phone
  });

  const handleBooking = (e) => {
    e.preventDefault();
    const totalAmount = hotel.rooms.find(room => room.type === bookingData.roomType)?.price.replace('$', '') || '0';
    
    navigate('/payment', {
      state: {
        bookingDetails: {
          hotelName: hotel.name,
          ...bookingData,
          totalAmount
        }
      }
    });
  };

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[70vh]">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-fixed"
          style={{ 
            backgroundImage: `url(${hotel.image})`,
            transform: 'scale(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-bold mb-4">{hotel.name}</h1>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <FaMapMarkerAlt />
              <span>{hotel.location}</span>
            </div>
            <div className="flex items-center justify-center">
              {[...Array(5)].map((_, i) => (
                <FaStar 
                  key={i} 
                  className={i < Math.floor(hotel.rating) ? 'text-yellow-400' : 'text-gray-300'} 
                />
              ))}
              <span className="ml-2">{hotel.rating}/5</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Gallery Grid with enhanced hover effects */}
        <div className="grid grid-cols-3 gap-4 mb-12">
          {hotel.galleryImages.map((img, index) => (
            <div key={index} className="overflow-hidden rounded-lg shadow-lg group">
              <img 
                src={img}
                alt={`${hotel.name} gallery ${index + 1}`}
                className="h-64 w-full object-cover transform transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Hotel Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section with enhanced typography */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
                About Our Hotel
              </h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed text-lg">
                {hotel.fullDescription}
              </p>
            </div>

            {/* Amenities with enhanced design */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
                Luxury Amenities
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {hotel.amenities.map((amenity, index) => (
                  <div key={index} 
                    className="flex items-center space-x-3 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition-colors"
                  >
                    <div className="text-blue-600 text-xl">{amenity.icon}</div>
                    <span className="text-gray-700 font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Types with enhanced cards */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
                Elegant Rooms & Suites
              </h2>
              <div className="space-y-6">
                {hotel.rooms.map((room, index) => (
                  <div key={index} 
                    className="border rounded-lg p-6 hover:shadow-md transition-shadow
                    bg-gradient-to-r from-white to-blue-50"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{room.type}</h3>
                        <p className="text-gray-600 mt-1">{room.size} | {room.capacity}</p>
                      </div>
                      <p className="text-2xl font-bold text-blue-600">{room.price}</p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {room.features.map((feature, i) => (
                        <span key={i} 
                          className="bg-white text-blue-600 px-3 py-1 rounded-full text-sm
                          font-medium border border-blue-200 hover:bg-blue-50 transition-colors"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reviews with enhanced design */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
                Guest Experiences
              </h2>
              <div className="space-y-6">
                {hotel.reviews.map((review, index) => (
                  <div key={index} 
                    className="border-b pb-6 last:border-b-0 hover:bg-gray-50 p-4 rounded-lg transition-colors"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-lg text-gray-800">{review.user}</h3>
                      <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
                        <FaStar className="text-yellow-400 mr-1" />
                        <span className="font-medium">{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 italic">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Booking Form & Policies */}
          <div className="space-y-8">
            {/* Booking Form with enhanced design */}
            <div className="bg-white rounded-xl shadow-lg p-8 sticky top-8">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                Reserve Your Stay
              </h2>
              <form onSubmit={handleBooking} className="space-y-6">
                <div>
                  <label className="block text-gray-700 mb-2">Check-in Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.checkIn}
                    onChange={(e) => setBookingData({...bookingData, checkIn: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Check-out Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.checkOut}
                    onChange={(e) => setBookingData({...bookingData, checkOut: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Room Type</label>
                  <select
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.roomType}
                    onChange={(e) => setBookingData({...bookingData, roomType: e.target.value})}
                  >
                    <option value="">Select Room Type</option>
                    {hotel.rooms.map((room, index) => (
                      <option key={index} value={room.type}>{room.type} - {room.price}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Number of Guests</label>
                  <input
                    type="number"
                    min="1"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.guests}
                    onChange={(e) => setBookingData({...bookingData, guests: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 
                    transition-colors font-semibold text-lg shadow-md hover:shadow-lg"
                >
                  Book Now
                </button>
              </form>
            </div>

            {/* Hotel Policies with enhanced design */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">
                Hotel Policies
              </h2>
              <div className="space-y-4">
                {Object.entries(hotel.policies).map(([key, value]) => (
                  <div key={key} 
                    className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-gray-600 capitalize font-medium">
                      {key.replace(/([A-Z])/g, ' $1').trim()}:
                    </span>
                    <span className="text-gray-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}