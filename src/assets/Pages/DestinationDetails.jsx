// src/Pages/DestinationDetails.jsx
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { FaMapMarkerAlt, FaStar, FaRegClock, FaUmbrella, FaCamera, FaHotel, FaPlane, FaCalendar, FaUsers } from 'react-icons/fa';
import { toast } from 'react-toastify';

const destinationsData = [
  {
    id: 1,
    name: "Cox's Bazar",
    description: "World's longest natural sea beach with stunning sunsets and seafood. Perfect for beach lovers and adventure seekers.",
    fullDescription: `Cox's Bazar is renowned for hosting the world's longest natural sea beach, stretching an impressive 120 kilometers along the Bay of Bengal. This paradise destination offers visitors a unique blend of natural beauty, local culture, and exciting activities.

    The beach itself is characterized by its gentle slope, clean sands, and spectacular sunrise and sunset views. Visitors can enjoy various water sports, including surfing, kayaking, and jet-skiing. The warm waters are perfect for swimming almost year-round.

    Beyond the beach, Cox's Bazar offers numerous attractions:
    - Himchari National Park with its stunning waterfalls
    - Inani Beach known for its coral stones
    - Marine Drive, offering scenic coastal views
    - Buddhist temples and local markets`,
    image: "https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
      "https://images.pexels.com/photos/1450354/pexels-photo-1450354.jpeg",
      "https://images.pexels.com/photos/1450355/pexels-photo-1450355.jpeg",
    ],
    price: "From $199",
    location: "Chittagong, Bangladesh",
    rating: 4.8,
    duration: "3-5 days recommended",
    highlights: ["Sea Beach", "Sunset Views", "Water Sports"],
    bestTimeToVisit: "November to March",
    thingsToSee: [
      "Marine Drive",
      "Himchari National Park",
      "Inani Beach",
      "Buddhist Temples",
      "Local Markets"
    ],
    activities: [
      "Surfing",
      "Beach Walking",
      "Sunset Photography",
      "Boat Rides",
      "Local Food Tasting"
    ],
    accommodation: {
      budget: "From $30/night",
      midRange: "From $80/night",
      luxury: "From $150/night"
    },
    howToReach: {
      byAir: "Direct flights from Dhaka to Cox's Bazar Airport",
      byBus: "Regular AC and non-AC buses from major cities",
      byTrain: "Train service available up to Chittagong"
    },
    tips: [
      "Book hotels in advance during peak season",
      "Carry sunscreen and beach essentials",
      "Respect local customs and dress modestly",
      "Try local seafood dishes",
      "Bargain at local markets"
    ]
  },

  {
    id: 2,
    name: "Sundarbans",
    description: "World's largest mangrove forest, home to Royal Bengal Tigers and unique biodiversity.",
    fullDescription: `The Sundarbans is a UNESCO World Heritage site and the world's largest mangrove forest, spanning across Bangladesh and India. This unique ecosystem is home to the famous Royal Bengal Tigers and countless other species of flora and fauna.

    The forest is a complex network of tidal waterways, mudflats, and small islands covered with mangrove forests. The biodiversity of the Sundarbans includes:
    - The rare Royal Bengal Tigers
    - Spotted deer and wild boars
    - Various species of birds and reptiles
    - Unique mangrove vegetation

    The Sundarbans also serves as a natural barrier against cyclones and tsunamis, protecting the coastal regions of Bangladesh. Its complex ecosystem provides livelihoods for many local communities through fishing, honey collection, and eco-tourism.`,
    image: "https://images.pexels.com/photos/831056/pexels-photo-831056.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/4577791/pexels-photo-4577791.jpeg",
      "https://images.pexels.com/photos/4577792/pexels-photo-4577792.jpeg",
      "https://images.pexels.com/photos/4577793/pexels-photo-4577793.jpeg",
    ],
    price: "From $299",
    location: "Khulna, Bangladesh",
    rating: 4.9,
    duration: "4-6 days recommended",
    highlights: ["Wildlife", "Mangrove Forest", "Boat Safari"],
    bestTimeToVisit: "December to February",
    thingsToSee: [
      "Royal Bengal Tigers",
      "Mangrove Forest",
      "Wildlife Sanctuary",
      "Local Villages",
      "Dublar Char Island"
    ],
    activities: [
      "Boat Safari",
      "Bird Watching",
      "Photography",
      "Honey Collection Tour",
      "Village Visits"
    ],
    accommodation: {
      budget: "From $40/night",
      midRange: "From $100/night",
      luxury: "From $200/night"
    },
    howToReach: {
      byAir: "Fly to Jessore Airport, then take a car to Khulna",
      byBus: "Regular buses from Dhaka to Khulna",
      byTrain: "Direct trains available from Dhaka to Khulna"
    },
    tips: [
      "Book tours through authorized operators",
      "Carry insect repellent and sunscreen",
      "Follow forest ranger guidelines",
      "Respect wildlife and maintain distance",
      "Carry enough drinking water"
    ]
  },
  {
    id: 3,
    name: "Saint Martin",
    description: "Bangladesh's only coral island, offering pristine beaches and marine life.",
    fullDescription: `Saint Martin's Island is Bangladesh's only coral island, located in the Bay of Bengal. This tropical paradise is known for its crystal-clear waters, coral reefs, and peaceful environment. The island spans roughly 8 square kilometers and offers visitors a unique blend of natural beauty and local culture.

    The island's main attractions include:
    - Pristine coral beaches with crystal clear waters
    - Rich marine life perfect for snorkeling
    - Fresh seafood restaurants
    - Beautiful sunrise and sunset views
    - Local Rakhine culture and cuisine

    The island's ecosystem is home to various species of coral and marine life, making it a perfect destination for nature lovers and underwater photography enthusiasts.`,
    image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
    galleryImages: [
      "https://images.pexels.com/photos/1450354/pexels-photo-1450354.jpeg",
      "https://images.pexels.com/photos/1450355/pexels-photo-1450355.jpeg",
      "https://images.pexels.com/photos/1450356/pexels-photo-1450356.jpeg",
    ],
    price: "From $249",
    location: "Bay of Bengal, Bangladesh",
    rating: 4.7,
    duration: "2-3 days recommended",
    highlights: ["Coral Beach", "Snorkeling", "Marine Life"],
    bestTimeToVisit: "November to February",
    thingsToSee: [
      "Coral Reefs",
      "Chera Dwip",
      "Marine Drive",
      "Lighthouse",
      "Local Markets"
    ],
    activities: [
      "Snorkeling",
      "Beach Walking",
      "Sunset Viewing",
      "Photography",
      "Seafood Tasting"
    ],
    accommodation: {
      budget: "From $25/night",
      midRange: "From $70/night",
      luxury: "From $150/night"
    },
    howToReach: {
      byAir: "Fly to Cox's Bazar, then take a boat to Saint Martin",
      byBus: "Take a bus to Teknaf, then a boat to the island",
      byShip: "Regular ships available from Cox's Bazar"
    },
    tips: [
      "Check weather conditions before booking",
      "Book accommodation in advance",
      "Carry cash as ATMs are limited",
      "Respect local customs",
      "Be mindful of coral preservation"
    ]
  }
  

  // Add more destinations here...
];

export default function DestinationDetails() {
  const { id } = useParams();
  const destination = destinationsData.find(d => d.id === parseInt(id));
  
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    date: '',
    guests: 1,
    package: 'budget'
  });

  const handleBooking = (e) => {
    e.preventDefault();
    // Here you would typically send this to your backend
    console.log('Booking Details:', {
      destination: destination.name,
      ...bookingData
    });
    toast.success('Booking request sent successfully!');
  };

  if (!destination) {
    return <div>Destination not found</div>;
  }

  return (
    <div className="bg-gray-50">
      {/* Hero Section with Parallax Effect */}
      <div className="relative h-[70vh] overflow-hidden">
        <div 
          className="absolute inset-0 bg-center bg-cover bg-fixed"
          style={{ 
            backgroundImage: `url(${destination.image})`,
            transform: 'scale(1.1)'
          }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-6xl font-bold mb-4 animate-fade-in">{destination.name}</h1>
            <p className="text-xl max-w-2xl mx-auto leading-relaxed">
              {destination.description}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Quick Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 -mt-20 mb-12 relative z-10">
          {[
            { icon: <FaRegClock />, label: "Duration", value: destination.duration },
            { icon: <FaMapMarkerAlt />, label: "Location", value: destination.location },
            { icon: <FaStar />, label: "Rating", value: `${destination.rating}/5` },
            { icon: <FaUmbrella />, label: "Best Time", value: destination.bestTimeToVisit }
          ].map((item, index) => (
            <div key={index} 
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow
                transform hover:-translate-y-1 duration-300"
            >
              <div className="text-blue-500 text-3xl mb-3">{item.icon}</div>
              <p className="text-gray-500 text-sm">{item.label}</p>
              <p className="font-semibold text-lg">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* About Section */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-3xl font-bold mb-6">About {destination.name}</h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {destination.fullDescription}
              </p>
            </div>

            {/* Gallery Section */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-3xl font-bold mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {destination.galleryImages.map((img, index) => (
                  <img 
                    key={index}
                    src={img}
                    alt={`${destination.name} gallery ${index + 1}`}
                    className="rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
                  />
                ))}
              </div>
            </div>

            {/* Things to See */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-3xl font-bold mb-6">Things to See</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {destination.thingsToSee.map((item, index) => (
                  <div key={index} 
                    className="flex items-center space-x-3 bg-blue-50 p-4 rounded-lg"
                  >
                    <FaCamera className="text-blue-500 text-xl" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Booking Form */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6">Book Your Trip</h2>
              <form onSubmit={handleBooking} className="space-y-6">
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
                  <label className="block text-gray-700 mb-2">Travel Date</label>
                  <input
                    type="date"
                    required
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.date}
                    onChange={(e) => setBookingData({...bookingData, date: e.target.value})}
                  />
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
                  <label className="block text-gray-700 mb-2">Package Type</label>
                  <select
                    className="w-full px-4 py-2 rounded-lg border focus:ring-2 focus:ring-blue-500"
                    value={bookingData.package}
                    onChange={(e) => setBookingData({...bookingData, package: e.target.value})}
                  >
                    <option value="budget">Budget Package</option>
                    <option value="standard">Standard Package</option>
                    <option value="luxury">Luxury Package</option>
                  </select>
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

            {/* Travel Tips */}
            <div className="bg-white rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-bold mb-4">Travel Tips</h2>
              <ul className="space-y-3">
                {destination.tips.map((tip, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <span className="text-blue-500 font-bold">•</span>
                    <span className="text-gray-600">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


