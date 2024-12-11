// components/FeaturedHotels.jsx
import { FaStar, FaWifi, FaParking, FaSwimmingPool, FaCoffee, FaMapMarkerAlt } from 'react-icons/fa';

export default function FeaturedHotels() {
  const hotels = [
    {
      id: 1,
      name: "Royal Tulip Sea Pearl Beach Resort",
      location: "Cox's Bazar",
      rating: 4.8,
      price: "$299",
      image: "https://images.pexels.com/photos/258154/pexels-photo-258154.jpeg",
      amenities: ["Free WiFi", "Pool", "Spa", "Beach Access"],
      description: "Luxury beachfront resort with stunning ocean views",
      reviews: 128
    },
    {
      id: 2,
      name: "Pan Pacific Sonargaon",
      location: "Dhaka",
      rating: 4.9,
      price: "$259",
      image: "https://images.pexels.com/photos/189296/pexels-photo-189296.jpeg",
      amenities: ["Room Service", "Pool", "Gym", "Restaurant"],
      description: "5-star luxury in the heart of the city",
      reviews: 245
    },
    {
      id: 3,
      name: "Long Beach Hotel",
      location: "Cox's Bazar",
      rating: 4.7,
      price: "$199",
      image: "https://images.pexels.com/photos/261102/pexels-photo-261102.jpeg",
      amenities: ["Beach View", "Pool", "Restaurant", "Spa"],
      description: "Modern comfort meets seaside charm",
      reviews: 186
    },
    {
      id: 4,
      name: "Radisson Blu Chattogram",
      location: "Chittagong",
      rating: 4.8,
      price: "$229",
      image: "https://images.pexels.com/photos/1838554/pexels-photo-1838554.jpeg",
      amenities: ["Business Center", "Pool", "Gym", "Restaurant"],
      description: "Luxury hotel in the port city",
      reviews: 156
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Hotels</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience luxury and comfort in our hand-picked selection of premium hotels
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {hotels.map((hotel) => (
            <div
              key={hotel.id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="relative">
                <img
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600">
                  From {hotel.price}/night
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{hotel.name}</h3>
                
                <div className="flex items-center mb-2">
                  <div className="flex items-center text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(hotel.rating) ? 'text-yellow-400' : 'text-gray-300'} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 text-sm">
                    ({hotel.reviews} reviews)
                  </span>
                </div>

                <p className="text-gray-600 text-sm mb-4">{hotel.description}</p>

                <div className="flex items-center text-gray-500 text-sm mb-4">
                  <FaMapMarkerAlt className="mr-1" />
                  {hotel.location}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="bg-blue-50 text-blue-600 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <button className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors font-semibold">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-white text-blue-600 border-2 border-blue-600 px-8 py-3 rounded-full hover:bg-blue-50 transition-colors text-lg font-semibold">
            View All Hotels
          </button>
        </div>
      </div>
    </section>
  );
}