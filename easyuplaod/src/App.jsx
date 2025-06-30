import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './Navbar';
import Login from './Login';
import Upload from './Upload';
import Category from './Category';
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('fb_access_token');
    setIsLoggedIn(!!token); // Set `true` if token exists, otherwise `false`
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('fb_access_token');
    setIsLoggedIn(false); // Update the logged-in state
  };

  return (
    <Router>
      {isLoggedIn && <Navbar onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login onLogin={() => setIsLoggedIn(true)} />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/family" element={<Category category="Family" />} />
        <Route path="/friends" element={<Category category="Friends" />} />
        <Route path="/places-visited" element={<Category category="Places Visited" />} />
        <Route path="/about-me" element={<Category category="About Me" />} />
      </Routes>
    </Router>
  );
};

export default App;
