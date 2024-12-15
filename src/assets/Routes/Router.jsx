// src/assets/Routes/Router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layouts/Root";
import Home from "../Pages/Home";
import LogIn from "../../LogIn";
import Register from "../../Register";
import CoxsBazar from "../Pages/CoxsBazar";
import Shreemangal from "../Pages/Shreemangal";
import Sundarban from "../Pages/Shundarban";
import Sajek from "../Pages/Sajek";
import Destinations from "../Pages/Destination"; // Import the Destinations component
import Blog from "../Pages/Blog"; // Import Blog component
import Contact from "../Pages/Contact"; // Import Contact component
import Booking from '../Pages/Booking';
import DestinationDetails from "../Pages/DestinationDetails";
import HotelDetails from "../Pages/HotelDetails"; 
import Payment from "../Pages/Payment";
import BookingConfirmation from "../Pages/BookingConfirmation";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/destinations",
        element: <Destinations />, // Destinations page
      },
      {
        path: "/coxs-bazar",
        element: <CoxsBazar />,
      },
      {
        path: "/shreemangal",
        element: <Shreemangal />,
      },
      {
        path: "/sundarban",
        element: <Sundarban />,
      },
      {
        path: "/sajek",
        element: <Sajek />,
      },
      {
        path: "/blog",
        element: <Blog />, // Blog page
      },
      {
        path: "/contact",
        element: <Contact />, // Contact page
      },
      {
        path: "/login",
        element: <LogIn />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/booking/:location/:destination",
        element: <Booking />,
      },
      {
        path: "/destination/:id",
        element: <DestinationDetails />,
      },
      {
        path: "/hotel/:id",
        element: <HotelDetails />,
      },
      {
        path: "/payment",
        element: <Payment />,
      },
      {
        path: "/booking-confirmation",
        element: <BookingConfirmation />,
      },
    ],
  },
]);

export default router;
