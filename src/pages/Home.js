import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowRight, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaCalendarAlt, FaSearch, FaUsers, FaClock } from 'react-icons/fa';
import styled from '@emotion/styled';
import './Home.css';
import audi1 from '../assets/audi1.jpg';
import audi2 from '../assets/audi2.jpg';
import audi3 from '../assets/audi3.jpg';
import audi4 from '../assets/audi4.jpg';
import audi5 from '../assets/audi5.jpg';
import audi6 from '../assets/audi6.jpg';

const IconWrapper = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: #fe0f1d;
`;

const BackgroundImage = styled(motion.div)`
  position: absolute;
  top: -5%;
  left: -5%;
  width: 110%;
  height: 110%;
  background-size: cover;
  background-position: center;
  filter: blur(8px);
`;

const Home = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [audi1, audi2, audi3, audi4, audi5, audi6];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const handleStartTracking = () => {
    navigate('/login');
  };

  const features = [
    {
      icon: <FaCalendarAlt />,
      title: 'Easy Booking',
      description: 'Effortlessly book your favorite club venues with our user-friendly interface and real-time availability.'
    },
    {
      icon: <FaSearch />,
      title: 'Venue Discovery',
      description: 'Explore a wide range of club venues with detailed information, photos, and user reviews to find the perfect spot.'
    },
    {
      icon: <FaUsers />,
      title: 'Capacity Management',
      description: 'Check venue capacities and ensure your event has the right space for your group size.'
    },
    {
      icon: <FaClock />,
      title: 'Booking History',
      description: 'Access your booking history and manage your reservations with ease.'
    }
  ];

  return (
    <div className="home">
      <section className="hero" style={{ position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence initial={false}>
          <BackgroundImage
            key={currentImageIndex}
            style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
            initial={{ opacity: 0, scale: 1, x: '0%', y: '0%' }}
            animate={{ 
              opacity: 1, 
              scale: 1.1, 
              x: ['-2%', '0%', '2%', '0%'],
              y: ['-2%', '0%', '2%', '0%']
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              opacity: { duration: 1 },
              scale: { duration: 5, ease: 'linear' },
              x: { duration: 5, ease: 'linear', repeat: Infinity, repeatType: 'reverse' },
              y: { duration: 5, ease: 'linear', repeat: Infinity, repeatType: 'reverse' }
            }}
          />
        </AnimatePresence>
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: 'relative', zIndex: 1 }}
        >
          <h1>VenueTrack</h1>
          <p>Make your event booking more organized and hassle-free with VenueTrack</p>
          <motion.button
            onClick={handleStartTracking}
            className="cta-button"
            whileHover={{ scale: 1.03 }} 
            whileTap={{ scale: 0.98 }} 
          >
            Start Booking <FaArrowRight style={{ marginLeft: '10px' }} />
          </motion.button>
        </motion.div>
      </section>

      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-grid">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="feature-item"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <IconWrapper>{feature.icon}</IconWrapper>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="cta">
        <h2>Ready to Optimize Your Bookings?</h2>
        <p>Make your event booking more organized and hassle-free with VenueTrack</p>
        <motion.button
          onClick={handleStartTracking}
          className="cta-button"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          Get Started Now <FaArrowRight style={{ marginLeft: '10px' }} />
        </motion.button>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>VenueTrack</h3>
            <p>Make your event booking more organized and hassle-free with VenueTrack.</p>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaLinkedinIn /></a>
              <a href="#"><FaInstagram /></a>
            </div>
          </div>
          <div className="footer-section links">
            <h3>Quick Links</h3>
            <ul>
              
              <li><Link to="/features">Features</Link></li>
              
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p><FaPhone /> +91 1234567890</p>
            <p><FaEnvelope /> info@VenueTrack.com</p>
            <p><FaMapMarkerAlt /> VIT Chennai, Kelambakkam</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 VenueTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
