
import './App.css'
import Login from './components/loginPage';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import Home from './components/HomePage.jsx';
import  EmployeeLayout from './components/EmployeeLayout.jsx'
import RegisterEmployeeForm from "./components/EmployeeRegister.jsx";
import EmployeeList from "./components/EmployeeList.jsx";
import UpdateEmployeeForm from "./components/UpdateEmployeeForm.jsx";

function App() {
  

  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/emplayout" element={<EmployeeLayout />} />
            <Route path="/empresiter" element={<RegisterEmployeeForm />} />
            <Route path="/emplist" element={<EmployeeList />} />
            <Route
              path="/updateemployee/:employeeId"
              element={<UpdateEmployeeForm />}
            />
          </Routes>
        </Router>
      </UserProvider>
    </>
  );
}

export default App
