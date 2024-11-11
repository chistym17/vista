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
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${bgImage})`,
      }}
    >
      <Navbar />
      <div className="flex flex-col bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-10 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-lg border border-orange-300">
        <h1 className="text-5xl font-bebo text-center mb-8 text-orange-600">
          Log In
        </h1>
        <form onSubmit={handleLogIn} className="w-full font-mons">
          <input
            className="mb-6 p-3 w-full h-12 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500"
            type="email"
            name="email"
            ref={emailRef}
            placeholder="Enter your email"
            required
          />
          <div className="relative flex items-center">
            <input
              className="p-3 w-full h-12 border border-orange-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-500 pr-12"
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter your password"
              required
            />
            <span
              className="absolute right-3 cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
              style={{ top: "50%", transform: "translateY(-50%)" }}
            >
              {showPassword ? (
                <FaRegEyeSlash size={20} />
              ) : (
                <FaRegEye size={20} />
              )}
            </span>
          </div>
          <div className="mt-3 text-center">
            <a
              href="#"
              onClick={handleForgotPassword}
              className="text-orange-600 hover:underline"
            >
              Forgot password?
            </a>
          </div>
          <input
            className="w-full h-12 bg-orange-600 text-white font-semibold rounded-md hover:bg-orange-700 cursor-pointer transition duration-300 ease-in-out mt-6"
            type="submit"
            value="Log In"
          />
          <div className="mt-4 text-center">
            <a href="/register" className="text-orange-600 hover:underline">
              Don't have an account? Register
            </a>
          </div>
        </form>

        {success && (
          <div
            role="alert"
            className="alert alert-success mt-4 p-4 bg-green-100 text-green-600 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{success}</span>
          </div>
        )}

        {loginError && (
          <div
            role="alert"
            className="mt-4 p-4 bg-red-100 text-red-600 rounded-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current inline mr-2"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{loginError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogIn;