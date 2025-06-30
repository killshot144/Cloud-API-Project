import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./App.css";
const Navbar = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout(); 
    navigate('/');
  };

  return (
    <nav>
      <Link to="/upload">Home</Link>
      <Link to="/family">Family</Link>
      <Link to="/friends">Friends</Link>
      <Link to="/places-visited">Places Visited</Link>
      <Link to="/about-me">About Me</Link>
      <button
        onClick={handleLogoutClick}
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
