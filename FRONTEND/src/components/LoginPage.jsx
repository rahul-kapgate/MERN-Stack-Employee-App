import React, { useState } from "react";
import Logo from "../assets/LogoImage.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useUser } from "../context/UserContext.jsx";

const Login = () => {
  const { setUser } = useUser();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/admin/login",
        { name, password }
      );

      alert(`${name} Login successful!`);

      // Store username in context
      setUser({ username: name });

      // Navigate to the home page
      navigate("/home");
    } catch (err) {
      handleError(err);
    }
  };

  const handleError = (err) => {
    if (err.response) {
      switch (err.response.status) {
        case 400:
          alert("Username and password are required.");
          break;
        case 401:
          alert("Invalid username or password.");
          break;
        case 500:
          alert("Internal server error. Please try again later.");
          break;
        default:
          alert("An error occurred. Please try again.");
          break;
      }
    } else if (err.request) {
      alert(
        "Network error: Unable to connect to the server. Please check your internet connection or try again later."
      );
    } else {
      alert(`An unexpected error occurred: ${err.message}`);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-sky-300 to-sky-500">
      <div className="bg-white p-6 sm:p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="text-center mb-6">
          <img src={Logo} alt="EMS Logo" className="mx-auto w-16 h-16" />
          <h1 className="text-3xl font-bold text-blue-900">EMS</h1>
          <h2 className="text-2xl font-semibold mt-2 text-gray-700">
            ADMIN LOGIN
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-sm font-medium text-gray-700"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
