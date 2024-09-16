import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signOut } from "firebase/auth";
import { auth } from '../firebase';
import './Navbar.css';

const Navbar = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
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
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/dashboard">Dashboard</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/tracking">Tracking</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/driver-info">Driver Info</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/trip-scheduling">Trip Scheduling</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/fuel-consumption">Fuel Consumption</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/maintenance">Maintenance</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}><Link to="/alerts">Alerts</Link></motion.li>
            <motion.li whileHover={{ scale: 1.1 }}>
              <button className="logout" onClick={handleLogout}>Logout</button>
            </motion.li>
          </>
        ) : (
          <>
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
