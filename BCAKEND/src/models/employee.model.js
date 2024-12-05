import mongoose from 'mongoose';


const EmployeeSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: Number,
      required: true,
    },
    designation: {
      type: String,
      required: true,
      enum: ["Manager", "Developer", "HR", "Designer", "Tester"],
    },
    gender: {
      type: String,
      required: true,
      enum: ["Male", "Female", "Other"],
    },
    courses: {
      type: [String], // Array of strings to hold multiple selected courses
      required: true,
      enum: ["B.Tech", "BCA", "M.Tech", "MCA", "B.Sc"],
    },
    profileImage: {
      type: String, //cloudinary url
      required: true,
    },
  },
  { timestamps: true }
);

export const Employee = mongoose.model("Employee" , EmployeeSchema)