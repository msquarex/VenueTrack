import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/dashboard');
    } catch (error) {
      if (error.code === 'auth/invalid-email' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
        setErrorMessage('Invalid email or password. Please try again.');
      } else {
        setErrorMessage('An error occurred. Please try again later.');
      }
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
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
            Login
          </motion.button>
        </form>
        <p className="switch-form">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;
