import React, { useState } from "react";
import image1 from "../images/Coxs.png";
import image2 from "../images/Sreemongol.png";
import image3 from "../images/sundorbon.png";
import image4 from "../images/Sajek.png";

const sliderData = [
  {
    image: image1,
    title: "MAGIC SLIDER",
    type: "Cox's Bazar",
    description:
      "Experience the world's longest sea beach with golden sands, rolling waves, and a tranquil atmosphere.",
  },
  {
    image: image2,
    title: "MAGIC SLIDER",
    type: "Sreemangal",
    description:
      "Explore the tea capital of Bangladesh, with lush green tea gardens, forests, and a rich biodiversity.",
  },
  {
    image: image3,
    title: "MAGIC SLIDER",
    type: "Sundarbans",
    description:
      "Discover the largest mangrove forest, home to the Royal Bengal Tiger and an incredible ecosystem.",
  },
  {
    image: image4,
    title: "MAGIC SLIDER",
    type: "Sajek",
    description:
      "Admire the breathtaking views of the hilly landscapes, lush forests, and serene environment in Sajek.",
  },
];

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === sliderData.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? sliderData.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      {/* Slider Section */}
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className="w-full h-screen flex-shrink-0"
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <div className="text-center text-white p-8">
                <h2 className="text-5xl font-bold">{slide.title}</h2>
                <p className="text-3xl text-green-400 mt-4">{slide.type}</p>
                <p className="mt-6 text-lg">{slide.description}</p>
                <button className="mt-8 px-6 py-2 bg-green-400 text-black font-bold uppercase transition-transform duration-200 transform hover:scale-105">
                  See More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail Section */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-4 z-10">
        {sliderData.map((slide, index) => (
          <div
            key={index}
            className={`w-24 h-36 flex-shrink-0 border-4 rounded-lg overflow-hidden ${
              currentIndex === index ? "border-green-400" : "border-transparent"
            }`}
            style={{
              backgroundImage: `url(${slide.image})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        ))}
      </div>

      {/* Next/Prev Buttons */}
      <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10">
        <button
          onClick={prevSlide}
          className="w-10 h-10 flex items-center justify-center bg-green-400 text-black rounded-full hover:bg-white hover:text-black transition duration-300"
        >
          &lt;
        </button>
      </div>
      <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10">
        <button
          onClick={nextSlide}
          className="w-10 h-10 flex items-center justify-center bg-green-400 text-black rounded-full hover:bg-white hover:text-black transition duration-300"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default ImageSlider;
