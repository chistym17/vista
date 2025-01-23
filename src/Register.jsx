import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import auth from "./assets/Firebase/firebase.config";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import bgImage from "../src/assets/images/registration.jpg";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      console.log(result.user);
      toast.success('Registration successful! Welcome aboard! 🎉');
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.message || 'Registration failed. Please try again.');
    }
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
          <h2 className="text-4xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Create Account
          </h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join us to start your journey ✨
          </p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Name Input */}
          <div className="group">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              required
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none hover:border-gray-300"
            />
          </div>

          {/* Email Input */}
          <div className="group">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              required
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none hover:border-gray-300"
            />
          </div>

          {/* Password Input */}
          <div className="relative group">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              required
              className="w-full px-4 py-3.5 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/20 transition-all duration-300 outline-none hover:border-gray-300"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              {showPassword ? <FaRegEyeSlash size={20} /> : <FaRegEye size={20} />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3.5 rounded-xl hover:opacity-90 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-blue-500/30 transform hover:translate-y-[-2px]"
          >
            Create Account
          </button>

          {/* Login Link */}
          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-600 hover:text-purple-600 font-semibold transition-colors duration-300">
              Log In
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
