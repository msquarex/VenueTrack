import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import './Login.css';

const AdminLogin = ({ onAuthStateChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (email === 'admin@gmail.com' && password === 'admin123') {
      setShowSuccessPopup(true);
      if (onAuthStateChange) {
        onAuthStateChange(true, true); // Pass isAuthenticated and isAdmin as true
      }
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/admin-dashboard');
      }, 2000);
    } else {
      setErrorMessage('Invalid email or password. Please try again.');
    }
  };

  return (
    <motion.div
      className="login-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="login-box"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <motion.div className="input-container" whileHover={{ scale: 1.05 }}>
            <input
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </motion.div>
          <motion.div className="input-container" whileHover={{ scale: 1.05 }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </motion.div>
          {errorMessage && <p className="error">{errorMessage}</p>}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Login as Admin
          </motion.button>
        </form>
        <p className="switch-form">
          Not an admin? <Link to="/login">User Login</Link>
        </p>
      </motion.div>
      <AnimatePresence>
        {showSuccessPopup && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="success-popup"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            >
              <h3>Admin Login Successful!</h3>
              <p>Welcome back, Admin. Redirecting to dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default AdminLogin;