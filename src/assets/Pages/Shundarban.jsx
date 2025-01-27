import React from "react";
import { useNavigate } from "react-router-dom";
import DarkNavbar from "./DarkNavbar";
import OptimizedImage from '../../components/OptimizedImage';
import image1 from "../images/shundarban1.jpg";
import image2 from "../images/shundarban2.jpg";
import image3 from "../images/shundarban3.jpg";
import image4 from "../images/shundarban4.jpg";
import foodImage1 from "../images/sf1.jpeg"; // Ilish Curry
import foodImage2 from "../images/sf2.jpeg"; // Coconut Naru
import foodImage3 from "../images/sf3.jpeg"; // Bhapa Pitha

const Sundarban = () => {
  const navigate = useNavigate();

  const cards = [
    {
      image: image1,
      title: "Mangrove Forest",
      description:
        "The largest mangrove forest in the world, home to the Royal Bengal Tiger and diverse wildlife.",
      path: "/sundarban/mangrove-forest",
    },
    {
      image: image2,
      title: "Karamjal Wildlife Center",
      description:
        "A popular destination in the Sundarbans, known for its wildlife and conservation efforts.",
      path: "/sundarban/karamjal-wildlife-center",
    },
    {
      image: image3,
      title: "Katka Beach",
      description:
        "A serene beach in the Sundarbans, offering stunning views of the Bay of Bengal.",
      path: "/sundarban/katka-beach",
    },
    {
      image: image4,
      title: "Hiron Point",
      description:
        "A popular spot for wildlife watching, especially for spotting the Royal Bengal Tiger.",
      path: "/sundarban/hiron-point",
    },
  ];

 
  const handleBooking = (path) => {
    
    const cleanPath = path.substring(1);
    const [location, destination] = cleanPath.split('/');
        
    navigate(`/booking/${location}/${destination}`);
  };


  const foods = [
    {
      name: "Nokshi Pitha",
      image: foodImage1, // Replace with the image for Nokshi Pitha
      description:
        "A traditional Bengali rice cake filled with sweet coconut and jaggery, often enjoyed during festivals.",
    },
    {
      name: "Rui Machher Fry",
      image: foodImage2, // Replace with the image for Rui Machher Fry
      description:
        "A delicious Bengali dish made from fried Rui fish, seasoned with spices and herbs.",
    },
    {
      name: "Ilish Curry",
      image: foodImage3,
      description:
        "A traditional Bengali dish made from hilsa fish, cooked with mustard and spices.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#d1e7dd", // Light green background
        minHeight: "100vh",
        fontFamily: "mons",
      }}
    >
      <DarkNavbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-8 sm:mb-12 text-gray-800 font-bebo">
          Explore Sundarban
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="card bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl flex flex-col"
              >
                <OptimizedImage
                  src={card.image}
                  alt={card.title}
                  className="w-full h-40 sm:h-48 lg:h-64 object-cover"
                />
                <div className="p-4 sm:p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold font-bebo text-gray-900">
                      {card.title}
                    </h3>
                    <p className="text-sm sm:text-base font-mons text-gray-700 mt-2">
                      {card.description}
                    </p>
                  </div>
                  <button
                    className="bg-gradient-to-r from-green-400 to-green-600 hover:from-green-500 hover:to-green-700 text-white py-2 px-3 sm:px-4 rounded font-mons transition-colors mt-4"
                    onClick={() => handleBooking(card.path)}
                  >
                    Start Booking
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 font-bebo">
              Must-Try Foods
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              {foods.map((food, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <OptimizedImage
                    src={food.image}
                    alt={food.name}
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">
                      {food.name}
                    </h3>
                    <p className="text-gray-600">{food.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sundarban;
