import React from "react";
import logo from "../assets/LogoImage.png";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const Home = () => {
  const { user } = useUser();

  return (
    <div className="min-h-screen bg-gray-800 text-gray-300">
      {/* Header Section */}
      <header className="flex justify-between items-center bg-gray-900 px-6 py-4 shadow-lg">
        <div className="font-bold text-indigo-500 text-xl">
          <img src={logo} alt="Logo" className="h-16 w-auto rounded-full" />
        </div>
        <nav className="flex gap-6 text-sm">
          <Link to="/home" className="cursor-pointer hover:text-indigo-500">
            Home
          </Link>
          <Link
            to="/emplayout"
            className="cursor-pointer hover:text-indigo-500"
          >
            Employees
          </Link>
          <span className="cursor-pointer hover:text-indigo-500">
            {/* username based on which user is logged in */}
            {user?.username || "Guest"}
          </span>
          <Link
            to="/"
            onClick={() => alert(`${user?.username || "User"} Logout`)} // Wrap the alert in a function
            className="hover:text-indigo-500 transition"
          >
            Logout
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex">
        {/* Main Content Area */}
        <main className="flex-1 p-8">
          <h1 className="text-3xl font-bold text-indigo-500">
            Welcome to Admin Panel
          </h1>
          <p className="mt-4 text-sm text-gray-400">
            Manage your application and employees here.
          </p>
          {/* Add more sections/content below */}
        </main>
      </div>
    </div>
  );
};

export default Home;
