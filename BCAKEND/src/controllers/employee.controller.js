import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { Employee } from '../models/employee.model.js'
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import mongoose from 'mongoose'



const registerEmployee = asyncHandler(async (req,res) =>{

   const {name, email,mobile, designation, gender, courses } = req.body;

   if(name === ""){
    throw new ApiError(400, "Name is required")
   }
   if(email === ""){
    throw new ApiError(400, "Email is required")
   }
   if(mobile === ""){
    throw new ApiError(400, "mobile is required")
   }
   if(designation === ""){
    throw new ApiError(400, "designation is required");
   }
   if(gender === ""){
    throw new ApiError(400, "Gender is required")
   }
   if(courses === ""){
    throw new ApiError(400, "courses is required")
   }

   const existedEmployee = await Employee.findOne({
    $or : [{name}, {email}]
   })

   if (existedEmployee) {
     throw new ApiError(
       409,
       "Username with username or email already existed !! "
     );
   }

   const profileImageLocalPath = req.files?.profileImage[0]?.path;

   if(!profileImageLocalPath){
    throw new ApiError(400, "profile Image file is required");
   }

   const profileImage = await uploadOnCloudinary(profileImageLocalPath);


   if(!profileImage){
    throw new ApiError(400, "Avatar file is required");
   }

   const employee = await Employee.create({
    name,
    email,
    mobile,
    designation,
    gender,
    courses,
    profileImage : profileImage?.url || ""
   })

   const createdEmployee = await Employee.findById(employee._id);

   if(!createdEmployee){
    throw new ApiError(500, "Error while registing Employee");
   }

   console.log("Employe Created")

   return res
   .status(201)
   .json(
    new ApiResponse(200, createdEmployee, "Employee creted succseesfully !!")
   )

})

const deleteEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  if (!employeeId) {
    throw new ApiError(400, "Employee ID is required");
  }

  console.log("Deleting employee with ID:", employeeId);

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new ApiError(400, "Invalid Employee ID");
  }

  const employee = await Employee.findById(employeeId);
  console.log("Employee found:", employee);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  await Employee.findByIdAndDelete(employeeId);

  console.log(`Employee with ID ${employeeId} deleted successfully`);
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Employee deleted successfully!"));
});

const getAllEmployees = asyncHandler(async (req, res) => {
  
  const employees = await Employee.find();

  if (!employees || employees.length === 0) {
    throw new ApiError(404, "No employees found");
  }

  console.log("Fetched all employees:", employees);

  // Send the employees' data to the frontend
  return res
    .status(200)
    .json(new ApiResponse(200, employees, "Employees retrieved successfully!"));
});

// const updateEmployee = asyncHandler(async (req, res) => {
  
//   // console.log("Received params:", req.params);
//   // console.log("Received body:", req.body);

  
//   const { employeeId } = req.params;


//   if (!mongoose.Types.ObjectId.isValid(employeeId)) {
//     throw new ApiError(400, "Invalid Employee ID");
//   }

//   const { name, email, mobile, designation, gender, courses } = req.body;

 
//   const employee = await Employee.findById(employeeId);
//   if (!employee) {
//     throw new ApiError(404, "Employee not found");
//   }

  
//   if (name === "") throw new ApiError(400, "Name is required");
//   if (email === "") throw new ApiError(400, "Email is required");
//   if (mobile === "") throw new ApiError(400, "Mobile is required");
//   if (designation === "") throw new ApiError(400, "Designation is required");
//   if (gender === "") throw new ApiError(400, "Gender is required");
//   if (courses && courses.length === 0)
//     throw new ApiError(400, "At least one course is required");

  
//   const existingEmail = await Employee.findOne({
//     email,
//     _id: { $ne: employeeId }, 
//   });

//   if (existingEmail) {
//     throw new ApiError(409, "Another employee with this email already exists");
//   }

 
//   const updatedEmployee = await Employee.findByIdAndUpdate(
//     employeeId,
//     {
//       name: name || employee.name,
//       email: email || employee.email,
//       mobile: mobile || employee.mobile,
//       designation: designation || employee.designation,
//       gender: gender || employee.gender,
//       courses: courses || employee.courses,
//     },
//     { new: true }
//   );

//   if (!updatedEmployee) {
//     throw new ApiError(500, "Error updating employee");
//   }

//   console.log(`Employee with ID ${name} updated successfully`);

//   return res
//     .status(200)
//     .json(
//       new ApiResponse(200, updatedEmployee, "Employee updated successfully!")
//     );
// });

const updateEmployee = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  // Check if ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new ApiError(400, "Invalid Employee ID");
  }

  const { name, email, mobile, designation, gender, courses } = req.body;

  // Find the existing employee
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  // Validate required fields
  if (name === "") throw new ApiError(400, "Name is required");
  if (email === "") throw new ApiError(400, "Email is required");
  if (mobile === "") throw new ApiError(400, "Mobile is required");
  if (designation === "") throw new ApiError(400, "Designation is required");
  if (gender === "") throw new ApiError(400, "Gender is required");
  if (courses && courses.length === 0)
    throw new ApiError(400, "At least one course is required");

  // Check if the new email is already in use by another employee
  const existingEmail = await Employee.findOne({
    email,
    _id: { $ne: employeeId }, // Exclude the current employee ID from the check
  });

  if (existingEmail) {
    throw new ApiError(409, "Another employee with this email already exists");
  }

  // Update the employee document
  const updatedEmployee = await Employee.findByIdAndUpdate(
    employeeId,
    {
      name: name || employee.name,
      email: email || employee.email,
      mobile: mobile || employee.mobile,
      designation: designation || employee.designation,
      gender: gender || employee.gender,
      courses: courses || employee.courses,
    },
    { new: true } // Return the updated document
  );

  if (!updatedEmployee) {
    throw new ApiError(500, "Error updating employee");
  }

  console.log(`Employee with ID ${employeeId} updated successfully`);

  // Return the updated employee data
  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedEmployee, "Employee updated successfully!")
    );
});


const getEmployeeById = asyncHandler(async (req, res) => {
  const { employeeId } = req.params;

  // Validate ObjectId
  if (!mongoose.Types.ObjectId.isValid(employeeId)) {
    throw new ApiError(400, "Invalid Employee ID");
  }

  // Find the employee by ID
  const employee = await Employee.findById(employeeId);

  if (!employee) {
    throw new ApiError(404, "Employee not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, employee, "Employee retrieved successfully"));
});





export {
  registerEmployee,
  deleteEmployee,
  getAllEmployees,
  updateEmployee,
  getEmployeeById,
};

