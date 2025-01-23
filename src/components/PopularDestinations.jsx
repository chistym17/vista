import React from 'react'
import { FaMapMarkerAlt, FaStar, FaRegClock } from 'react-icons/fa'
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";

export default function PopularDestinations() {
  const destinations = [
    {
      id: 1,
      name: "Cox's Bazar",
      description: "World's longest natural sea beach with stunning sunsets and seafood. Perfect for beach lovers and adventure seekers.",
      image: "https://images.pexels.com/photos/1835718/pexels-photo-1835718.jpeg",
      price: "From $199",
      location: "Chittagong, Bangladesh",
      rating: 4.8,
      duration: "3-5 days recommended",
      highlights: ["Sea Beach", "Sunset Views", "Water Sports"]
    },
    {
      id: 2,
      name: "Sundarbans",
      description: "World's largest mangrove forest, home to Royal Bengal Tigers. Experience unique wildlife and breathtaking nature.",
      image: "https://images.pexels.com/photos/831056/pexels-photo-831056.jpeg",
      price: "From $299",
      location: "Khulna, Bangladesh",
      rating: 4.9,
      duration: "4-6 days recommended",
      highlights: ["Wildlife", "Boat Safari", "Mangrove Forest"]
    },
    {
      id: 3,
      name: "Saint Martin",
      description: "Beautiful coral island with crystal clear waters and marine life. Perfect for snorkeling and beach camping.",
      image: "https://images.pexels.com/photos/1450353/pexels-photo-1450353.jpeg",
      price: "From $249",
      location: "Bay of Bengal, Bangladesh",
      rating: 4.7,
      duration: "2-3 days recommended",
      highlights: ["Coral Beach", "Snorkeling", "Island Life"]
    }
  ]

  const cardVariants = {
    initial: { scale: 0.9, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    hover: { scale: 1.05, transition: { duration: 0.2 } }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4"
      >
        <h2 className="text-4xl font-bold text-center mb-4">
          Popular Destinations
        </h2>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover the most beautiful places in Bangladesh and create unforgettable memories
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <motion.div
              key={destination.id}
              variants={cardVariants}
              initial="initial"
              whileInView="animate"
              whileHover="hover"
              viewport={{ once: true }}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="relative">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-sm font-semibold text-blue-600 shadow-md">
                  {destination.price}
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    {destination.name}
                  </h3>
                  <div className="flex items-center bg-blue-50 px-2 py-1 rounded-full">
                    <FaStar className="text-yellow-400 mr-1" />
                    <span className="text-gray-700 font-semibold">{destination.rating}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-4">
                  {destination.description}
                </p>

                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-500">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    <span>{destination.location}</span>
                  </div>
                  <div className="flex items-center text-gray-500">
                    <FaRegClock className="mr-2 text-blue-500" />
                    <span>{destination.duration}</span>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex flex-wrap gap-2">
                    {destination.highlights.map((highlight, idx) => (
                      <span 
                        key={idx}
                        className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <Link 
                  to={`/destination/${destination.id}`}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold flex items-center justify-center"
                >
                  Explore More
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}