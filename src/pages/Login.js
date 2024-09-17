import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, query, where, getDocs } from "firebase/firestore";
import './Login.css';
import * as bcrypt from 'bcryptjs';
import { auth } from '../firebase';

const Login = ({ onAuthStateChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage('');
    try {
      // Query Firestore for user with matching email
      const userQuery = query(collection(db, "users"), where("email", "==", email));
      const userQuerySnapshot = await getDocs(userQuery);

      if (userQuerySnapshot.empty) {
        throw new Error("User not found");
      }

      const userDoc = userQuerySnapshot.docs[0];
      const userData = userDoc.data();

      // Compare passwords using bcrypt
      const passwordMatch = await bcrypt.compare(password, userData.password);

      if (!passwordMatch) {
        throw new Error("Invalid password");
      }

      // Set the current user in the auth object
      auth.currentUser = {
        uid: userDoc.id,
        email: userData.email,
        // Add any other user properties you want to store
      };

      setShowSuccessPopup(true);
      if (onAuthStateChange) {
        onAuthStateChange(true);
      }
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error("Login error:", error);
      if (error.message === "User not found" || error.message === "Invalid password") {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
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
        initial={{ y: -50, rotateX: -10 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Login to VenueTrack
        </motion.h2>
        <form onSubmit={handleLogin}>
          <motion.div
            className="input-container"
            whileHover="focus"
            whileFocus="focus"
            variants={inputVariants}
          >
            <motion.input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              whileTap={{ scale: 0.98 }}
            />
          </motion.div>
          <motion.div
            className="input-container"
            whileHover="focus"
            whileFocus="focus"
            variants={inputVariants}
          >
            <motion.input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              whileTap={{ scale: 0.98 }}
            />
          </motion.div>
          {errorMessage && (
            <motion.p
              className="error"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {errorMessage}
            </motion.p>
          )}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <motion.div
                className="loading-spinner"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
              />
            ) : (
              "Login"
            )}
          </motion.button>
        </form>
        <motion.p
          className="switch-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </motion.p>
        <motion.p
          className="switch-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Are you an admin? <Link to="/admin-login">Admin Login</Link>
        </motion.p>
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
              initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.5, opacity: 0, rotateY: 180 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <h3>Login Successful!</h3>
              <p>Welcome back to VenueTrack. Redirecting to dashboard...</p>
              <motion.div
                className="confetti"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Login;
