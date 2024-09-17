import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { db } from '../firebase';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import './Signup.css';
import * as bcrypt from 'bcryptjs';

const Signup = ({ onAuthStateChange }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(''); // Clear any previous error messages
    try {
      // Check if user already exists
      const userQuery = query(collection(db, "users"), where("email", "==", email));
      const userQuerySnapshot = await getDocs(userQuery);

      if (!userQuerySnapshot.empty) {
        throw new Error("User already exists");
      }

      // Hash password using bcrypt
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Add new user to Firestore
      const newUser = await addDoc(collection(db, "users"), {
        email: email,
        password: hashedPassword,
        createdAt: new Date()
      });

      console.log("User created successfully:", newUser.id);
      setShowSuccessPopup(true);
      if (onAuthStateChange) {
        onAuthStateChange(true); // Set authentication state to true
      }
      setTimeout(() => {
        setShowSuccessPopup(false);
        navigate('/dashboard');
      }, 3000);
    } catch (error) {
      console.error("Detailed error during signup:", error);
      setErrorMessage(error.message || "An error occurred during signup");
    } finally {
      setIsLoading(false);
    }
  };

  const inputVariants = {
    focus: { scale: 1.05, boxShadow: "0px 0px 8px rgba(0,0,0,0.2)" },
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
        initial={{ y: -50, rotateX: -10 }}
        animate={{ y: 0, rotateX: 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      >
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Sign Up for VenueTrack
        </motion.h2>
        <form onSubmit={handleSignup}>
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
              "Sign Up"
            )}
          </motion.button>
        </form>
        <motion.p
          className="switch-form"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Already have an account? <Link to="/login">Login</Link>
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
              <h3>Signup Successful!</h3>
              <p>Welcome to VenueTrack. Redirecting to dashboard...</p>
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

export default Signup;
