import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../logo.png"; // Replace with your actual logo

const DarkNavbar = () => {
  return (
    <nav className="navbar absolute top-0 left-0 w-full flex items-center justify-between p-4 lg:p-6 xl:p-8 z-10 font-mons text-xs lg:text-sm bg-transparent">
      <div className="flex items-center">
        <img src={logo} alt="Travel Guru" className="h-10 lg:h-12" />{" "}
        {/* Logo */}
      </div>
      <div className="flex items-center space-x-4 lg:space-x-6">
        <NavLink
          to="/"
          className="text-gray-400 text-xs lg:text-sm"
          activeClassName="font-bold text-white"
        >
          Home
        </NavLink>
        <NavLink
          to="/register"
          className="text-gray-400 text-xs lg:text-sm"
          activeClassName="font-bold text-white"
        >
          Register
        </NavLink>
        <NavLink
          to="/destination"
          className="text-gray-400 text-xs lg:text-sm"
          activeClassName="font-bold text-white"
        >
          Destination
        </NavLink>
        <NavLink
          to="/blog"
          className="text-gray-400 text-xs lg:text-sm"
          activeClassName="font-bold text-white"
        >
          Blog
        </NavLink>
        <NavLink
          to="/contact"
          className="text-gray-400 text-xs lg:text-sm"
          activeClassName="font-bold text-white"
        >
          Contact
        </NavLink>
        <NavLink
          to="/login"
          className="bg-gradient-to-r from-orange-400 to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white text-xs lg:text-sm font-semibold py-2 px-3 lg:py-2 lg:px-4 rounded-sm lg:rounded"
          activeClassName="bg-orange-600"
        >
          Login
        </NavLink>
      </div>
    </nav>
  );
};

export default DarkNavbar;
