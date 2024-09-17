import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

import { auth } from '../firebase';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onAuthStateChange }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear the current user from the custom auth object
    auth.currentUser = null;
    
    // Update the authentication state
    onAuthStateChange(false);
    
    // Navigate to the home page
    navigate('/');
  };

  return (
    <motion.nav
      className="Nav"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="navbar-logo">
        <Link to={isAuthenticated ? "/dashboard" : "/"}>VenueTrack</Link>
      </div>
      <ul className="NavLinks">
        {isAuthenticated ? (
          <>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/">Home</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/dashboard">Dashboard</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/booking-history">Booking History</Link></motion.li>
           
            
            <motion.li whileHover={{ scale: 1.1 }}>
              <button className="logout" onClick={handleLogout}>Logout</button>
            </motion.li>
          </>
        ) : (
          <>
          <motion.li whileHover={{ scale: 1.1 }}><Link to="/">Home</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/login">Login</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/signup">Sign Up</Link></motion.li>
            
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/contact">Contact</Link></motion.li>
          </>
        )}
      </ul>
    </motion.nav>
  );
};

export default Navbar;
