import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import './Signup.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setShowSuccessPopup(true);
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      setErrorMessage(error.message);
      // Handle specific error codes
      if (error.code === 'auth/email-already-in-use') {
        setErrorMessage('This email is already registered. Please try logging in.');
      }
    }
  };

  return (
    <motion.div
      className="signup-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="signup-box"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        <h2>Sign Up</h2>
        <form onSubmit={handleSignup}>
          <motion.div className="input-container" whileHover={{ scale: 1.05 }}>
            <input
              type="email"
              placeholder="Email"
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
            Sign Up
          </motion.button>
        </form>
        <p className="switch-form">
          Already have an account? <Link to="/login">Login</Link>
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
              <h3>Signup Successful!</h3>
              <p>Welcome to TeleTrack. Redirecting to dashboard...</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Signup;
