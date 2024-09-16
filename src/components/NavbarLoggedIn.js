

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavbarLoggedIn.css';

const NavbarLoggedIn = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear authentication token or user session
    localStorage.removeItem('authToken');
    // Redirect to the home page
    navigate('/');
  };

  return (
    <nav className="Nav">
      <div className="navbar-logo">
        <Link to="/dashboard">TeleTrack</Link>
      </div>
      <ul className="NavLinks">
        <li><Link to="/dashboard">Dashboard</Link></li>
        <li><Link to="/tracking">Tracking</Link></li>
        <li><Link to="/driver-info">Driver Info</Link></li>
        <li><Link to="/features">Features</Link></li> {/* New Features button */}
        <li><Link to="/trip-scheduling">Trip Scheduling</Link></li> {/* New Trip Scheduling button */}
        <li><Link to="/fuel-consumption">Fuel Consumption</Link></li> {/* New Fuel Consumption button */}
        <li><Link to="/maintenance">Maintenance</Link></li> {/* New Maintenance button */}
        <li><Link to="/alerts">Alerts</Link></li> {/* New Alerts button */}
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/profile">Profile</Link></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default NavbarLoggedIn;
