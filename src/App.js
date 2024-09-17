import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { auth } from './firebase';
import Navbar from './components/Navbar';

import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import BookingHistory from './pages/BookingHistory';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Check if there's a current user in the auth object
    setIsAuthenticated(!!auth.currentUser);
    setLoading(false);
  }, []);

  const handleAuthStateChange = (authState) => {
    setIsAuthenticated(authState);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} onAuthStateChange={handleAuthStateChange} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onAuthStateChange={handleAuthStateChange} />} />
          <Route path="/signup" element={<Signup onAuthStateChange={handleAuthStateChange} />} />
          <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/booking-history" element={isAuthenticated ? <BookingHistory /> : <Navigate to="/login" />} />
          <Route path="/admin-login" element={<AdminLogin onAuthStateChange={handleAuthStateChange} />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
