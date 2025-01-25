import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../image.png"; 
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.config"; 
import { signOut } from "firebase/auth";
import { FaUser, FaSignOutAlt, FaRegBell, FaCalendarAlt } from 'react-icons/fa';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setShowProfileMenu(false);
      })
      .catch((error) => {
        console.error("Logout Error:", error);
      });
  };

  return (
    <nav className="navbar absolute top-0 left-0 w-full flex items-center justify-between p-4 lg:p-6 xl:p-8 z-10 font-mons text-xs lg:text-sm bg-transparent">
      <div className="flex items-center">
        <img src={logo} alt="Travel Guru" className="h-10 lg:h-12" />{" "}
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
          <div className="relative">
            <div 
              className="flex items-center space-x-3 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 cursor-pointer hover:bg-white/20 transition-all duration-300"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full border-2 border-white/50"
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-semibold">
                    {user.displayName?.[0] || user.email?.[0].toUpperCase()}
                  </span>
                </div>
              )}
              <span className="text-white font-medium hidden md:block">
                {user.displayName || user.email.split('@')[0]}
              </span>
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-900 rounded-xl shadow-lg shadow-black/30 py-2 z-50 transform origin-top-right transition-all duration-200 border border-gray-800">
                <div className="px-4 py-3 border-b border-gray-800">
                  <p className="text-sm font-medium text-gray-100">
                    {user.displayName || 'Welcome!'}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {user.email}
                  </p>
                </div>

                <div className="py-1">
                  <a
                    href="#profile"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150"
                  >
                    <FaUser className="mr-3 text-gray-500" />
                    Your Profile
                  </a>
                  <a
                    href="#notifications"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150"
                  >
                    <FaRegBell className="mr-3 text-gray-500" />
                    Notifications
                  </a>
                  <NavLink
                    to="/my-bookings"
                    className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-150"
                  >
                    <FaCalendarAlt className="mr-3 text-gray-500" />
                    My Bookings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-gray-800 hover:text-red-300 transition-colors duration-150"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <NavLink
            to="/login"
            className="text-white text-xs lg:text-sm bg-gradient-to-r from-blue-400 via-blue-500 to-blue-600 hover:from-blue-500 hover:to-blue-700 px-4 py-2 rounded-full transition-all duration-300 shadow-lg hover:shadow-blue-500/30"
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
