import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from './firebase';
import Navbar from './components/Navbar';
import truckCursor from './assets/truck-cursor.svg';
import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AddTruck from './pages/AddTruck';
import Tracking from './pages/Tracking';
import DriverInfo from './pages/DriverDetails';
import Contact from './pages/Contact';

import FuelConsumption from './pages/FuelConsumption';
import TripScheduling from './pages/TripScheduling';
import Maintenance from './pages/Maintenance';
import Alerts from './pages/Alerts';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
          <Route path="/add-truck" element={<AddTruck />} />
          <Route path="/tracking" element={<Tracking />} />
          <Route path="/driver-info" element={<DriverInfo />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/fuel-consumption" element={<FuelConsumption />} />
          <Route path="/trip-scheduling" element={<TripScheduling />} />
          <Route path="/maintenance" element={<Maintenance />} />
          <Route path="/alerts" element={<Alerts />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
