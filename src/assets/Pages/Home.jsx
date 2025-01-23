import React from "react";
import { motion } from "framer-motion";
import Carousel from "./Carousel";
import Navbar from "./Navbar";
import PopularDestinations from "../../components/PopularDestinations";
import FeaturedHotels from "../../components/FeaturedHotels";
import WhyChooseUs from "../../components/WhyChooseUs";
import Testimonials from "../../components/Testimonials";
import Newsletter from "../../components/Newsletter";
import Blog from '../../assets/Pages/Blog';
import Contact from '../../assets/Pages/Contact';

const fadeInUp = {
  initial: { y: 50, opacity: 0 },
  animate: { y: 0, opacity: 1 },
  transition: { duration: 0.6 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

const Home = () => {
  return (
    <motion.main
      initial="initial"
      animate="animate"
      className="overflow-hidden"
    >
      <Navbar />
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <Carousel />
      </motion.div>

      <motion.div
        variants={staggerContainer}
        className="space-y-16 md:space-y-24"
      >
        <motion.div
          variants={fadeInUp}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <PopularDestinations />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <FeaturedHotels />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <WhyChooseUs />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <Blog />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <Testimonials />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <Contact />
        </motion.div>

        <motion.div
          variants={fadeInUp}
          viewport={{ once: true }}
          whileInView="animate"
        >
          <Newsletter />
        </motion.div>
      </motion.div>
    </motion.main>
  );
};

export default Home;
