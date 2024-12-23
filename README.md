# Employee Management System

## Overview

The **Employee Management System** is a full-stack web application built with **React** on the frontend, and **Node.js** with **MongoDB** on the backend. It allows administrators to register, update, delete, and view employee details, while also supporting user authentication (login/logout) and managing admin access.

The project consists of two main parts:
1. **Frontend**: React-based user interface for managing employees and admin authentication.
2. **Backend**: Node.js with Express to handle API requests, database operations, and authentication.

## Table of Contents
1. [Tech Stack](#tech-stack)
2. [Features](#features)
3. [Installation](#installation)
4. [Backend API](#backend-api)
5. [Frontend](#frontend)


## Tech Stack

### Frontend:
- **React** (for building UI components)
- **React Router** (for navigation)
- **Axios** (for making API requests)
- **Multer** (for handling file uploads)

### Backend:
- **Node.js** (runtime environment)
- **Express.js** (web framework)
- **MongoDB** (database)
- **Mongoose** (MongoDB ODM)
- **JWT** (for token-based authentication)
- **Bcrypt.js** (for hashing passwords)

## Features

### Admin Features:
- **Login and Logout**: Admin can log in with credentials, and refresh tokens for session management.
- **Register Admin**: Admin can be registered via a simple API call.
- **Employee Management**: Admin can create, read, update, and delete employee details.
- **Secure Routes**: Some routes are protected by JWT authentication.

### Employee Features:
- **Employee Information**: Employees have fields like `name`, `email`, `designation`, `gender`, and `courses`.
- **Profile Images**: Employees can upload a profile image during registration.
  
## Installation

### Backend

1. Clone the repository:
    ```bash
    git clone https://github.com/your-username/employee-management-system.git
    cd employee-management-system
    ```

2. Install dependencies:
    ```bash
    cd backend
    npm install
    ```

3. Create a `.env` file in the root of the **backend** folder and add the necessary environment variables. Example:
    ```
    DB_URL=mongodb://localhost:27017
    DB_NAME=your_database_name
    ACCESS_TOKEN_SECRET=your-access-token-secret
    REFRESH_TOKEN_SECRET=your-refresh-token-secret
    ACCESS_TOKEN_EXPIRY=15m
    REFRESH_TOKEN_EXPIRY=7d
    ```

4. Run the backend server:
    ```bash
    npm run dev
    ```

5. The backend will now be running on **http://localhost:5000**.

### Frontend

1. In a new terminal, navigate to the **frontend** folder:
    ```bash
    cd frontend
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Create a `.env` file in the **frontend** folder and add the API URL:
    ```
    REACT_APP_API_URL=http://localhost:5000/api
    ```

4. Run the frontend development server:
    ```bash
    npm start
    ```

5. The frontend will now be running on **http://localhost:3000**.

## Backend API

### Authentication Routes
- **POST** `/api/admin/registeradmin`: Register a new admin.
- **POST** `/api/admin/login`: Login an admin.
- **POST** `/api/admin/logout`: Logout the admin.
- **POST** `/api/admin/refresh-token`: Refresh the access token.

### Employee Routes
- **POST** `/api/employees/registeremployee`: Register a new employee with profile image.
- **DELETE** `/api/employees/deleteemployee/:employeeId`: Delete an employee.
- **GET** `/api/employees/allemployees`: Get a list of all employees.
- **PUT** `/api/employees/updateemployee/:employeeId`: Update an employee's information.
- **GET** `/api/employees/oneemployees/:employeeId`: Get an employee's information by ID.

### Middlewares
- **verifyJWT**: Middleware to verify JWT tokens for protected routes.

## Frontend

### Pages:
- **LoginPage**: A page for admin login.
- **DashboardPage**: A page to view admin dashboard and manage employees.
- **EmployeeListPage**: A page to list all employees and perform actions (update, delete).

### Components:
- **EmployeeForm**: Form for adding/updating an employee.
- **EmployeeCard**: Card displaying employee information.
- **AuthProvider**: A context provider to manage user authentication.

### Services:
- **adminService.js**: Handles API calls related to admin authentication and management.
- **employeeService.js**: Handles API calls related to employee CRUD operations.

### Hooks:
- **useAuth**: A custom hook to access authentication state.
- **useEmployees**: A custom hook to fetch and manage employee data.

## Environment Variables

### Backend:
- `DB_URL`: MongoDB connection URL.
- `DB_NAME`: Name of the MongoDB database.
- `ACCESS_TOKEN_SECRET`: Secret key for JWT access token.
- `REFRESH_TOKEN_SECRET`: Secret key for JWT refresh token.
- `ACCESS_TOKEN_EXPIRY`: Expiry time for access token (e.g., '15m').
- `REFRESH_TOKEN_EXPIRY`: Expiry time for refresh token (e.g., '7d').

### Frontend:
- `REACT_APP_API_URL`: URL for the backend API (e.g., `http://localhost:5000/api`).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
