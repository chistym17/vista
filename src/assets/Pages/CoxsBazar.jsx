import React from "react";
import { useNavigate } from "react-router-dom";
import DarkNavbar from "./DarkNavbar";
import OptimizedImage from '../../components/OptimizedImage';
import image1 from "../images/coxs1.jpg";
import image2 from "../images/coxs2.jpg";
import image3 from "../images/coxs3.jpg";
import image4 from "../images/coxs4.jpg";
import foodImage1 from "../images/c1.jpeg"; // Spicy Crab
import foodImage2 from "../images/c2.jpeg"; // Loitta Fry
import foodImage3 from "../images/c3.jpeg"; // Grilled/Fried Rupchanda

const CoxsBazar = () => {
  const navigate = useNavigate();

  const cards = [
    {
      image: image1,
      title: "Laboni Beach",
      description:
        "Laboni Beach is the main beach in Cox's Bazar, offering a perfect spot for sunbathing and swimming.",
      path: "/coxs-bazar/laboni-beach",
    },
    {
      image: image2,
      title: "Himchari",
      description:
        "Himchari is known for its waterfall and hilltop views, a short drive from the main town.",
      path: "/coxs-bazar/himchari",
    },
    {
      image: image3,
      title: "Inani Beach",
      description:
        "Inani Beach offers a quieter alternative to the main beach, with golden sands and calm waters.",
      path: "/coxs-bazar/inani-beach",
    },
    {
      image: image4,
      title: "Saint Martin's Island",
      description:
        "A beautiful island near Cox's Bazar, known for its crystal-clear waters and vibrant marine life.",
      path: "/coxs-bazar/saint-martins-island",
    },
  ];

  const handleBooking = (path) => {
    
    const cleanPath = path.substring(1);
    const [location, destination] = cleanPath.split('/');
        
    navigate(`/booking/${location}/${destination}`);
  };

  const foods = [
    {
      name: "Spicy Crab",
      image: foodImage1,
      description:
        "A delicious crab dish covered in spice mixes, either slow-cooked or grilled, perfect for seafood lovers.",
    },
    {
      name: "Loitta Fry",
      image: foodImage2,
      description:
        "A popular dish made from the Bombay duck fish, marinated in spices and fried to perfection.",
    },
    {
      name: "Grilled/Fried Rupchanda",
      image: foodImage3,
      description:
        "A must-try fish dish, Rupchanda is either grilled or fried, offering a rich and flavorful experience.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#e3f2fd",
        minHeight: "100vh",
        fontFamily: "mons",
      }}
    >
      <DarkNavbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-8 sm:mb-12 text-gray-800 font-bebo">
          Explore Cox's Bazar
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl flex flex-col"
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
                    className="bg-gradient-to-r from-blue-400 to-blue-600 hover:from-blue-500 hover:to-blue-700 text-white py-2 px-3 sm:px-4 rounded font-mons transition-colors mt-4"
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

export default CoxsBazar;
