import React, { useState } from "react";
import axios from "axios";
import logo from "../assets/LogoImage.png";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext.jsx";

const RegisterEmployeeForm = () => {
  const { user } = useUser();

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
      !courses.length ||
      !profileImage
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
    formDataToSubmit.append("profileImage", profileImage);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/employee/registeremployee",
        formDataToSubmit,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setSuccessMessage(response.data.message);
      setFormData({
        name: "",
        email: "",
        mobile: "",
        designation: "",
        gender: "",
        courses: [],
        profileImage: null,
      });
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred");
    }
  };

  return (
    <>
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
            Register Employee
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
            {/* Form Fields */}
            {[
              { name: "name", label: "Name", type: "text" },
              { name: "email", label: "Email", type: "email" },
              { name: "mobile", label: "Mobile", type: "number" },
            ].map(({ name, label, type }) => (
              <div key={name}>
                <label className="block text-sm font-medium mb-2">
                  {label}
                </label>
                <input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            ))}

            {/* Designation */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Designation
              </label>
              <select
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">Select Designation</option>
                <option value="Manager">Manager</option>
                <option value="Developer">Developer</option>
                <option value="HR">HR</option>
                <option value="Designer">Designer</option>
                <option value="Tester">Tester</option>
              </select>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium mb-2">Gender</label>
              <div className="flex gap-4">
                {["Male", "Female", "Other"].map((gender) => (
                  <label key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={formData.gender === gender}
                      onChange={handleChange}
                      className="mr-2 focus:ring-2 focus:ring-indigo-500"
                    />
                    {gender}
                  </label>
                ))}
              </div>
            </div>

            {/* Courses */}
            <div>
              <label className="block text-sm font-medium mb-2">Courses</label>
              <div className="grid grid-cols-2 gap-4">
                {["B.Tech", "BCA", "M.Tech", "MCA", "B.Sc"].map((course) => (
                  <label key={course} className="flex items-center">
                    <input
                      type="checkbox"
                      value={course}
                      checked={formData.courses.includes(course)}
                      onChange={handleCourseChange}
                      className="mr-2 focus:ring-2 focus:ring-indigo-500"
                    />
                    {course}
                  </label>
                ))}
              </div>
            </div>

            {/* Profile Image */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Profile Image
              </label>
              <input
                type="file"
                onChange={handleFileChange}
                className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded focus:ring-2 focus:ring-indigo-500 focus:outline-none text-gray-300"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded focus:outline-none focus:ring-4 focus:ring-indigo-400 transition"
            >
              Register Employee
            </button>
          </form>
        </main>
      </div>
    </>
  );
};

export default RegisterEmployeeForm;

 