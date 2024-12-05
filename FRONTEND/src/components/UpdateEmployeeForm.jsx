import React, { useState, useEffect } from "react";
import axios from "axios";
import logo from "../assets/LogoImage.png";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const UpdateEmployeeForm = () => {
  const { user } = useUser();
  const { employeeId } = useParams(); // Assuming employeeId is passed as a route parameter

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    designation: "",
    gender: "",
    courses: [],
    profileImage: null,
  });

  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Fetch employee data to prefill the form
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/v1/employee/oneemployees/${employeeId}` // Update API call
        );
        const { name, email, mobile, designation, gender, courses } =
          response.data.data;

        setFormData({
          name,
          email,
          mobile,
          designation,
          gender,
          courses,
          profileImage: null, // Profile image won't be fetched, can be re-uploaded if needed
        });
      } catch (err) {
        setError(
          err.response?.data?.message || "Failed to fetch employee data"
        );
      }
    };

    fetchEmployeeData();
  }, [employeeId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profileImage: e.target.files[0],
    }));
  };

  const handleCourseChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prevData) => {
      const courses = checked
        ? [...prevData.courses, value]
        : prevData.courses.filter((course) => course !== value);
      return { ...prevData, courses };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { name, email, mobile, designation, gender, courses, profileImage } =
      formData;

    if (
      !name ||
      !email ||
      !mobile ||
      !designation ||
      !gender ||
      !courses.length
    ) {
      setError("All fields are required");
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append("name", name);
    formDataToSubmit.append("email", email);
    formDataToSubmit.append("mobile", mobile);
    formDataToSubmit.append("designation", designation);
    formDataToSubmit.append("gender", gender);
    courses.forEach((course) => {
      formDataToSubmit.append("courses", course);
    });
    if (profileImage) {
      formDataToSubmit.append("profileImage", profileImage);
    }

    try {
      const response = await axios.put(
        `http://localhost:5000/api/v1/employee/updateemployee/${employeeId}`,
        formDataToSubmit,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      setSuccessMessage(response.data.message);
      alert("Employee updated successfully!"); // Show success alert after navigation
      navigate("/emplayout"); // Navigate immediately after the backend response
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <div className="bg-gray-900 text-gray-300 min-h-screen">
      <header className="flex justify-between items-center bg-gray-800 px-6 py-4 shadow-md">
        <div className="flex items-center gap-4">
          <img src={logo} alt="Logo" className="h-12 w-12 rounded-full" />
          <span className="text-2xl font-bold text-indigo-500">
            Employee Portal
          </span>
        </div>
        <nav className="flex gap-4 text-sm">
          <Link to="/home" className="hover:text-indigo-500 transition">
            Home
          </Link>
          <Link to="/emplayout" className="hover:text-indigo-500 transition">
            Employees
          </Link>
          <span className="hover:text-indigo-500 transition">
            {user?.username || "Guest"}
          </span>
          <Link
            to="/"
            onClick={() => alert(`${user?.username || "User"} Logout`)}
            className="hover:text-indigo-500 transition"
          >
            Logout
          </Link>
        </nav>
      </header>

      <main className="max-w-3xl mx-auto mt-10 bg-gray-800 text-gray-300 p-8 rounded-lg shadow-lg">
        <h1 className="text-center text-3xl font-bold text-indigo-500 mb-6">
          Update Employee
        </h1>
        {error && (
          <div className="bg-red-100 text-red-600 p-2 rounded mb-4">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-100 text-green-600 p-2 rounded mb-4">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { name: "name", label: "Name", type: "text" },
            { name: "email", label: "Email", type: "email" },
            { name: "mobile", label: "Mobile", type: "number" },
          ].map(({ name, label, type }) => (
            <div key={name}>
              <label className="block text-sm font-medium mb-2">{label}</label>
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
          ))}
          {/* Repeat similar fields for Designation, Gender, Courses, and Profile Image */}
          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
          >
            Update Employee
          </button>
        </form>
      </main>
    </div>
  );
};

export default UpdateEmployeeForm;
