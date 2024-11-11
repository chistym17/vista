import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import auth from "./assets/Firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import bgImage from "../src/assets/images/registration.jpg"; // Replace with your actual background image path

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;

    const uppercaseRegex = /[A-Z]/;
    const numberRegex = /\d/;

    if (!uppercaseRegex.test(password)) {
      setRegisterError("Password must contain at least one uppercase letter.");
      return;
    }

    if (!numberRegex.test(password)) {
      setRegisterError("Password must contain at least one number.");
      return;
    }

    if (!accepted) {
      setRegisterError("Please accept our terms and conditions.");
      return;
    }

    setRegisterError("");
    setSuccess("");
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("You have successfully registered!");

        sendEmailVerification(result.user).then(() => {
          alert("Please verify your email address.");
          navigate("/"); // Redirect to home page after registration
        });
      })
      .catch((error) => {
        setRegisterError(error.message);
      });
  };

  return (
    <div
      className="flex justify-center items-center min-h-screen bg-cover bg-center relative"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url(${bgImage})`,
      }}
    >
      <div className="flex flex-col bg-white bg-opacity-30 backdrop-filter backdrop-blur-lg p-10 rounded-lg shadow-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4 max-w-lg border border-gray-300">
        <h1 className="text-5xl font-bebo text-center mb-8 text-gray-700">
          Register
        </h1>
        <form onSubmit={handleRegister} className="w-full font-mons">
          <input
            className="mb-6 p-3 w-full h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500"
            type="text"
            name="name"
            placeholder="Enter your name"
            required
          />
          <input
            className="mb-6 p-3 w-full h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500"
            type="email"
            name="email"
            placeholder="Enter your email"
            required
          />
          <div className="relative flex items-center">
            <input
              className="p-3 w-full h-12 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400 focus:border-gray-500 pr-12"
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
          <div className="flex items-center mt-4">
            <input type="checkbox" name="terms" id="terms" required />
            <label
              htmlFor="terms"
              className="ml-2 text-gray-700"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Accept our{" "}
              <Link
                to="/terms-and-condition"
                target="_blank"
                className="underline text-white"
              >
                Terms and Conditions
              </Link>
            </label>
          </div>
          <input
            className="w-full h-12 bg-gray-700 text-white font-semibold rounded-md hover:bg-gray-800 cursor-pointer transition duration-300 ease-in-out mt-6"
            type="submit"
            value="Register"
          />
          <div className="mt-4 text-center">
            <Link
              to="/login"
              className="text-gray-700 hover:underline"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Already have an account? Log In
            </Link>
          </div>
          <div className="text-center mt-4">
            <a
              href="#"
              className="text-white hover:underline"
              style={{ textShadow: "1px 1px 2px rgba(0, 0, 0, 0.2)" }}
            >
              Forgot password?
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
        {registerError && (
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
            <span>{registerError}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
