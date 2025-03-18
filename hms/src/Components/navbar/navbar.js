import React from 'react';
import './NavBar.css';
import { Link } from 'react-router-dom';

import Vectorlogo from './VectorLogo.png'; 

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <img src={Vectorlogo} alt="Logo" className="logo" /> 
      
      <h3>GIET Hospital</h3>
      </div>
      <div className="navbar-right">
      <Link to="/">Home</Link>
      <Link to="/OPD">OPD</Link>
      <Link to="/About">About</Link>
      <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default NavBar;
