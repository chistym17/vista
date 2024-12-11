import React from "react";
import Carousel from "./Carousel";
import Navbar from "./Navbar";
import PopularDestinations from "../../components/PopularDestinations";
import FeaturedHotels from "../../components/FeaturedHotels";
import WhyChooseUs from "../../components/WhyChooseUs";
import Testimonials from "../../components/Testimonials";
import Newsletter from "../../components/Newsletter";
import Blog from '../../assets/Pages/Blog';
import Contact from '../../assets/Pages/Contact';
const Home = () => {
  return (
    <main>
      <Navbar></Navbar>
      <Carousel></Carousel>
      <PopularDestinations />
      <FeaturedHotels />
      <WhyChooseUs />
      <Blog />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default Home;
