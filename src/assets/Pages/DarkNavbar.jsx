import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../Firebase/firebase.config"; 
import { signOut } from "firebase/auth";
import { FaCalendarAlt, FaSignOutAlt } from "react-icons/fa";

const DarkNavbar = () => {
  const [user] = useAuthState(auth);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <nav className="bg-gray-800 text-white w-full flex items-center justify-between p-4 lg:p-6 xl:p-8 font-mons text-xs lg:text-sm shadow-md">
      <Link to="/" className="text-2xl font-bold text-white">
        TravelNest
      </Link>

      <div className="flex items-center space-x-4 lg:space-x-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-gray-100 hover:text-white text-xs lg:text-sm transition-colors duration-200 ${
              isActive ? 'font-semibold' : ''
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/blog"
          className={({ isActive }) =>
            `text-gray-100 hover:text-white text-xs lg:text-sm transition-colors duration-200 ${
              isActive ? 'font-semibold' : ''
            }`
          }
        >
          Blog
        </NavLink>
        {user && (
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              `flex items-center text-gray-100 hover:text-white text-xs lg:text-sm space-x-1 transition-colors duration-200 ${
                isActive ? 'font-semibold' : ''
              }`
            }
          >
            <FaCalendarAlt className="text-xs lg:text-sm mr-1" />
            <span>My Bookings</span>
          </NavLink>
        )}
        {user ? (
          <div className="relative" ref={menuRef}>
            <div 
              className="flex items-center space-x-3 bg-gray-700 hover:bg-gray-600 rounded-full px-4 py-2 cursor-pointer transition-all duration-200"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <img
                src={user.photoURL || "https://via.placeholder.com/32"}
                alt="Profile"
                className="w-6 h-6 rounded-full"
              />
              <span className="hidden sm:block text-gray-100">{user.displayName || user.email}</span>
            </div>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-xl shadow-lg py-2 z-50 transform origin-top-right transition-all duration-200 border border-gray-700">
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm font-medium text-white">
                    {user.displayName || 'Welcome!'}
                  </p>
                  <p className="text-xs text-gray-300 truncate">
                    {user.email}
                  </p>
                </div>

                <div className="py-1">
                  <NavLink
                    to="/my-bookings"
                    className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-700 hover:text-white transition-colors duration-150"
                  >
                    <FaCalendarAlt className="mr-3 text-gray-400" />
                    My Bookings
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-300 hover:bg-gray-700 hover:text-red-200 transition-colors duration-150"
                  >
                    <FaSignOutAlt className="mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Link
            to="/login"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-full transition-all duration-200"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default DarkNavbar;
