import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../image.png"; // Replace with your actual logo
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.config"; // Adjust the import path
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [user] = useAuthState(auth);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <nav className="navbar absolute top-0 left-0 w-full flex items-center justify-between p-4 lg:p-6 xl:p-8 z-10 font-mons text-xs lg:text-sm bg-transparent">
      <div className="flex items-center">
        <img src={logo} alt="Travel Guru" className="h-10 lg:h-12" />{" "}
        {/* Logo */}
      </div>
      <div className="flex items-center space-x-4 lg:space-x-6">
      
        <NavLink
          to="/blog"
          className="text-white text-xs lg:text-sm"
          activeClassName="font-bold"
        >
          Blog
        </NavLink>
        <NavLink
          to="/contact"
          className="text-white text-xs lg:text-sm"
          activeClassName="font-bold"
        >
          Contact
        </NavLink>
        {user ? (
          <div className="flex items-center space-x-4">
            <button
              onClick={handleLogout}
              className="text-white text-xs lg:text-sm bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
            >
              Logout
            </button>
          </div>
        ) : (
          <NavLink
            to="/login"
            className="text-white text-xs lg:text-sm bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 px-3 py-1 rounded"
            activeClassName="font-bold"
          >
            Login
          </NavLink>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
