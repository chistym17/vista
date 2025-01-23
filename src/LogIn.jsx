import { useRef, useState } from "react";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import React from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import auth from "./assets/Firebase/firebase.config";
import Navbar from "./assets/Pages/Navbar";
import bgImage from "../src/assets/images/lg5.jpg"; // Replace with your actual background image path

const LogIn = () => {
  const [loginError, setLoginError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const emailRef = useRef(null);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogIn = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    setLoginError("");
    setSuccess("");

    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("Successfully logged in!");
        navigate("/"); // Redirect to home page after login
      })
      .catch((error) => {
        setLoginError(error.message);
      });
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setLoginError("Please enter a valid email address.");
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess("Password reset email sent! Check your inbox.");
        setLoginError("");
      })
      .catch((error) => {
        setLoginError(error.message);
        setSuccess("");
      });
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url(${bgImage})`,
      }}
    >
      <div className="max-w-md w-full bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-10 transform hover:scale-[1.02] transition-all duration-300">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Sign in to your account 🔐
          </p>
        </div>

        <form onSubmit={handleLogIn} className="space-y-6">
          {/* Email Input */}
          <div className="group">
            <input
              type="email"
              name="email"
              ref={emailRef}
              placeholder="Email Address"
              required
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 outline-none hover:border-gray-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/20 transition-all duration-300 outline-none hover:border-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
          </div>

          {/* Forgot Password Link */}
          <div className="flex justify-end">
            <button
              onClick={handleForgotPassword}
              className="text-orange-600 hover:text-orange-700 text-sm font-semibold transition-colors duration-200"
            >
              Forgot your password?
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-500 to-red-600 text-white py-3.5 rounded-xl hover:opacity-90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-orange-500/30 transform hover:translate-y-[-2px]"
          >
            Sign In
          </button>

          {/* Register Link */}
          <p className="text-center text-gray-600 mt-6">
            Don't have an account?{" "}
            <a
              href="/register"
              className="text-orange-600 hover:text-red-600 font-semibold transition-colors duration-300"
            >
              Register
            </a>
          </p>
        </form>

        {/* Success Alert */}
        {success && (
          <div className="mt-6 p-4 rounded-xl bg-green-50 border border-green-200 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-green-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-green-700">{success}</span>
          </div>
        )}

        {/* Error Alert */}
        {loginError && (
          <div className="mt-6 p-4 rounded-xl bg-red-50 border border-red-200 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-red-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="text-red-700">{loginError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;
