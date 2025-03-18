import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './Components/navbar/navbar'; 
import Dashboard from './Components/Body/Dashboard';
import Teams from './Components/Body/OurTeams';
import Main from './Components/Body/Main';
import AboutUs from './Components/Body/About';
import Login from './Components/Body/Login';
import PatientDashboard from './Components/Body/PatientDashboard';
import PLogin from './Components/Body/PLogin';


function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/OPD" element={<Teams />} />
          <Route path="/About" element={<AboutUs />} />
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/patient" element={<PatientDashboard />} />
          <Route path='/patient-login' element={<PLogin />} />
        </Routes> 
        
      </div>
      
     </Router> 
  );
}

export default App;
