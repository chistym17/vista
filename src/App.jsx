import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Carousel from "./components/Carousel"; // Assuming Carousel is in the components folder
import CoxsBazar from "./components/CoxsBazar"; // Create or import this component
import Shreemangal from "./components/Shreemangal"; // Create or import this component
import Sundarban from "./components/Sundarban"; // Create or import this component
import Sajek from "./components/Sajek"; // Create or import this component
import Booking from './assets/Pages/Booking';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PopularDestinations from "./components/PopularDestinations";
import FeaturedHotels from "./components/FeaturedHotels";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Carousel />} />
        <Route path="/coxs-bazar" element={<CoxsBazar />} />
        <Route path="/shreemangal" element={<Shreemangal />} />
        <Route path="/sundarban" element={<Sundarban />} />
        <Route path="/sajek" element={<Sajek />} />
        <Route path="/booking/:location/:destination" element={<Booking />} />
        <Route path="/popular-destinations" element={<PopularDestinations />} />
        <Route path="/featured-hotels" element={<FeaturedHotels />} />
      </Routes>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
      />
    </Router>
  );
}

export default App;
