import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import EmployeeDashboard from "./components/EmployeeDashboard";
import EmployeeDetails from './components/EmployeeDetails';
import EmployeeEdit from './components/EmployeeEdit';
import CreateEmployee from './components/CreateEmployee';
import LandingPage from "./components/LandingPage";
import AppNavbar from './components/Navbar';
import './styles/App.scss';


function App() {
  return (
      <Router>
          <AppNavbar />
          <div className="container mt-4">
              <Routes>
                  <Route path="/" element={<LandingPage />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route path="/employees" element={<EmployeeDashboard />} />
                  <Route path="/employees/create" element={<CreateEmployee />} />
                  <Route path="/employees/view/:id" element={<EmployeeDetails />} />
                  <Route path="/employees/edit/:id" element={<EmployeeEdit />} />
              </Routes>
          </div>
      </Router>
  );
}

export default App;
