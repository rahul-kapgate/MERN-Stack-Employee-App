import React from "react";
import logo from "../assets/LogoImage.png";
import { Link, useNavigate } from "react-router-dom"; 
import { useUser } from "../context/UserContext.jsx";

const EmployeeLayout = () => {
  const { user, setUser } = useUser(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    
    setUser({ username: "" });
    alert(`${user.username} logged out successfully!`);
    navigate("/"); 
  };

  return (
    <div className="min-h-screen bg-gray-800 text-gray-300">
      {/* Header Section */}
      <header className="flex flex-wrap justify-between items-center bg-gray-900 px-6 py-4 shadow-lg">
        <div className="font-bold text-indigo-500 text-xl flex items-center">
          <img src={logo} alt="Logo" className="h-12 w-auto rounded-full" />
        </div>
        <nav className="flex flex-wrap gap-4 mt-4 sm:mt-0 text-sm">
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
            {user.username || "Guest"}
          </span>
          <Link
            to="/"
            onClick={handleLogout}
            className="hover:text-indigo-500 transition"
          >
            Logout
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <div className="flex flex-col items-center p-6 sm:flex-row sm:justify-center sm:gap-10">
        {/* Create Employee Button */}
        <div className="w-full sm:w-auto mb-4 sm:mb-0">
          <h1 className="text-xl sm:text-2xl font-bold text-white bg-indigo-600 rounded-lg p-4 shadow-md">
            <Link
              to="/empresiter"
              className="block text-center hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out rounded-lg"
            >
              Create Employee
            </Link>
          </h1>
        </div>

        {/* Employee List Button */}
        <div className="w-full sm:w-auto">
          <h1 className="text-xl sm:text-2xl font-bold text-white bg-indigo-600 rounded-lg p-4 shadow-md">
            <Link
              to="/emplist"
              className="block text-center hover:bg-indigo-500 hover:text-white transition-all duration-300 ease-in-out rounded-lg"
            >
              Employee List
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default EmployeeLayout;
