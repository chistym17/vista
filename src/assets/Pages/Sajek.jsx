import React from "react";
import { useNavigate } from "react-router-dom";
import DarkNavbar from "./DarkNavbar";
import image1 from "../images/sajek1.jpg";
import image2 from "../images/sajek2.jpg";
import image3 from "../images/sajek3.jpg";
import image4 from "../images/sajek4.jpg";
import foodImage1 from "../images/bamboo.jpeg";
import foodImage2 from "../images/handi.jpeg";
import foodImage3 from "../images/tea.jpeg";

const Sajek = () => {
  const navigate = useNavigate();

  const cards = [
    {
      image: image1,
      title: "Sajek Valley",
      description:
        "Sajek Valley, known for its breathtaking views and serene environment, is a popular destination for tourists looking to escape the hustle and bustle of city life.",
      path: "/sajek/valley",
    },
    {
      image: image2,
      title: "Konglak Hill",
      description:
        "Konglak Hill is one of the highest peaks in the Sajek region. It offers panoramic views of the surrounding hills and valleys, perfect for hiking and photography.",
      path: "/sajek/konglak-hill",
    },
    {
      image: image3,
      title: "Ruilui Para",
      description:
        "Ruilui Para is a beautiful tribal village in Sajek. Experience the unique culture and lifestyle of the indigenous people living in harmony with nature.",
      path: "/sajek/ruilui-para",
    },
    {
      image: image4,
      title: "Helipad",
      description:
        "The helipad in Sajek is a popular spot for tourists to witness the sunrise and sunset, offering a spectacular view of the entire valley.",
      path: "/sajek/helipad",
    },
  ];

 
  const handleBooking = (path) => {
    
    const cleanPath = path.substring(1);
    const [location, destination] = cleanPath.split('/');
        
    navigate(`/booking/${location}/${destination}`);
  };


  const foods = [
    {
      name: "Bamboo Chicken",
      image: foodImage1,
      description:
        "A delicious dish where chicken is cooked inside bamboo, infusing it with a unique, smoky flavor.",
    },
    {
      name: "Rangamati Handi Biriyani",
      image: foodImage2,
      description:
        "A special biriyani prepared in a clay pot, giving it an earthy aroma and rich taste.",
    },
    {
      name: "Traditional Sajek Tea",
      image: foodImage3,
      description:
        "A locally brewed tea that offers a soothing and authentic taste of Sajek's culture.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#f0f8ff", // Light blue background
        minHeight: "100vh",
        fontFamily: "mons",
      }}
    >
      <DarkNavbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-8 sm:mb-12 text-gray-800 font-bebo">
          Explore Sajek
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-xl rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-2xl flex flex-col"
              >
                <img
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
                    className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white py-2 px-3 sm:px-4 rounded font-mons transition-colors mt-4"
                    onClick={() => handleBooking(card.path)}
                  >
                    Start Booking
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-4 sm:mb-6 font-bebo text-center text-gray-800">
              Foods in Sajek
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-1 gap-6">
              {foods.map((food, index) => (
                <div
                  key={index}
                  className="bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <img
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

export default Sajek;
