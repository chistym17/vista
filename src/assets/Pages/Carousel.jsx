import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.config"; // Adjust the import path
import image1 from "../images/coxs.jpg";
import image2 from "../images/shreemangal.jpg";
import image3 from "../images/shundarban.jpg";
import image4 from "../images/sajek.jpg";

const Carousel = () => {
  const carouselRef = useRef(null);
  const sliderRef = useRef(null);
  const thumbnailRef = useRef(null);
  const navigate = useNavigate();
  const [user] = useAuthState(auth); // Check if user is logged in
  const timeRunning = 3000;
  const timeAutoNext = 7000;
  let runTimeOut, runNextAuto;

  const slides = [
    {
      image: image1,
      title: "Cox's Bazar",
      description:
        "Cox's Bazar is the longest sea beach in the world, with an unbroken length of 120 km. It is a major tourist destination in Bangladesh.",
      path: "/coxs-bazar", // Corrected path
    },
    {
      image: image2,
      title: "Shreemangal",
      description:
        "Shreemangal, the tea capital of Bangladesh, is known for its lush green tea gardens and rolling hills. It's a serene escape for nature lovers.",
      path: "/shreemangal", // Corrected path
    },
    {
      image: image3,
      title: "Sundarban",
      description:
        "The Sundarbans is the largest mangrove forest in the world, home to the Bengal tiger and a UNESCO World Heritage site.",
      path: "/sundarban", // Corrected path
    },
    {
      image: image4,
      title: "Sajek",
      description:
        "Sajek Valley is a picturesque and serene tourist spot in the Chittagong Hill Tracts, known for its cloud-kissed hills and natural beauty.",
      path: "/sajek", // Corrected path
    },
  ];

  const showSlider = (type) => {
    const sliderItems = sliderRef.current.querySelectorAll(".item");
    const thumbnailItems = thumbnailRef.current.querySelectorAll(".item");

    if (type === "next") {
      sliderRef.current.appendChild(sliderItems[0]);
      thumbnailRef.current.appendChild(thumbnailItems[0]);
      carouselRef.current.classList.add("next");
    } else {
      sliderRef.current.prepend(sliderItems[sliderItems.length - 1]);
      thumbnailRef.current.prepend(thumbnailItems[thumbnailItems.length - 1]);
      carouselRef.current.classList.add("prev");
    }

    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
      carouselRef.current.classList.remove("next");
      carouselRef.current.classList.remove("prev");
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);
  };

  useEffect(() => {
    runNextAuto = setTimeout(() => {
      showSlider("next");
    }, timeAutoNext);

    return () => {
      clearTimeout(runNextAuto);
      clearTimeout(runTimeOut);
    };
  }, []);

  const handleBooking = (path) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(path);
    }
  };

  return (
    <div
      ref={carouselRef}
      className="carousel h-screen w-full relative overflow-hidden"
    >
      {/* Slider Items */}
      <div ref={sliderRef} className="list absolute inset-0">
        {slides.map((slide, index) => (
          <div key={index} className="item absolute inset-0 w-full h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="content absolute top-1/2 transform -translate-y-1/2 left-8 right-8 text-white max-w-2xl space-y-4 md:space-y-6 lg:space-y-8">
              <div className="title text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {slide.title}
              </div>
              <div className="des text-base md:text-lg">
                {slide.description}
              </div>
              <div className="buttons">
                <button
                  className="bg-orange-500 hover:bg-orange-600 text-white py-2 px-6"
                  onClick={() => handleBooking(slide.path)} // Navigate to the corresponding page or login
                >
                  Booking
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnail Items */}
      <div
        ref={thumbnailRef}
        className="thumbnail absolute bottom-20 left-1/2 transform -translate-x-1/2 flex gap-3 sm:gap-5"
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="item w-24 h-36 sm:w-28 sm:h-40 md:w-36 md:h-56 relative"
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover rounded-lg"
            />
            <div className="title absolute bottom-2 left-2 right-2 text-white text-sm text-center font-medium">
              {slide.title}
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="arrows absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-6">
        <button
          id="prev"
          onClick={() => showSlider("prev")}
          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/30 text-white font-bold hover:bg-white hover:text-black"
        >
          {"<"}
        </button>
        <button
          id="next"
          onClick={() => showSlider("next")}
          className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/30 text-white font-bold hover:bg-white hover:text-black"
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
