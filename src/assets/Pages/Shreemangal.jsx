import React from "react";
import { useNavigate } from "react-router-dom";
import DarkNavbar from "./DarkNavbar";
import image1 from "../images/shreemangal1.jpg";
import image2 from "../images/shreemangal2.jpg";
import image3 from "../images/shreemangal3.jpg";
import image4 from "../images/shreemangal4.jpg"; // Add image for the fourth place
import foodImage1 from "../images/sh1.jpeg"; // 7 Layer Tea
import foodImage2 from "../images/sh2.jpeg"; // Fried Bamboo Shoots
import foodImage3 from "../images/sh3.jpeg"; // Pithas

const Shreemangal = () => {
  const navigate = useNavigate();

  const cards = [
    {
      image: image1,
      title: "Lawachara National Park",
      description:
        "A national park in Shreemangal, home to diverse wildlife and a beautiful rainforest.",
      path: "/shreemangal/lawachara-national-park",
    },
    {
      image: image2,
      title: "Madhabkunda Waterfall",
      description:
        "One of the largest waterfalls in Bangladesh, surrounded by lush green hills.",
      path: "/shreemangal/madhabkunda-waterfall",
    },
    {
      image: image3,
      title: "Tea Gardens",
      description:
        "Shreemangal is famous for its vast tea gardens, offering scenic views and a peaceful atmosphere.",
      path: "/shreemangal/tea-gardens",
    },
    {
      image: image4,
      title: "Hiking Trails",
      description:
        "Explore the scenic hiking trails around Shreemangal, offering breathtaking views and fresh air.",
      path: "/shreemangal/hiking-trails",
    },
  ];

 
  const handleBooking = (path) => {
    
    const cleanPath = path.substring(1);
    const [location, destination] = cleanPath.split('/');
        
    navigate(`/booking/${location}/${destination}`);
  };

  const foods = [
    {
      name: "Handi Biryani",
      image: foodImage1, // Update with the image for Handi Biryani
      description:
        "A fragrant and flavorful biryani cooked in a traditional handi, combining tender meat with aromatic spices.",
    },
    {
      name: "Shatkara Beef",
      image: foodImage2, // Update with the image for Shatkara Beef
      description:
        "A spicy Bengali beef dish cooked with shatkora, a tangy citrus fruit, adding a unique flavor to the meat.",
    },
    {
      name: "7 Layer Tea",
      image: foodImage3,
      description:
        "A unique and flavorful tea with seven distinct layers, each with a different taste.",
    },
  ];

  return (
    <div
      style={{
        backgroundColor: "#e0f7fa",
        minHeight: "100vh",
        fontFamily: "mons",
      }}
    >
      <DarkNavbar />
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-12">
        <h1 className="text-3xl sm:text-4xl font-bold text-center mt-10 mb-8 sm:mb-12 text-gray-800 font-bebo">
          Explore Shreemangal
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {cards.map((card, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-48 sm:h-56 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2 text-gray-800">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{card.description}</p>
                  <button
                    className="bg-teal-500 hover:bg-teal-600 text-white py-2 px-4 rounded"
                    onClick={() => handleBooking(card.path)}
                  >
                    Book Now
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

export default Shreemangal;
