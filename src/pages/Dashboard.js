import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

import kasturbaHallImage from '../assets/kasturba-hall.jpg';
import mgAuditoriumImage from '../assets/MG-Auditorium.jpg';
import netajiImage from '../assets/Nethaji-Auditorium.jpg';
import AB3Image from '../assets/Ab-3 Hall.jpeg';
import maingroundImage from '../assets/main-ground.png';
import ab1Image from '../assets/ab-1 portigo.jpeg';
import MBamphoImage from '../assets/mb-amphi.jpeg';
// Import other images similarly

const listings = [
  { id: 1, name: 'Kasturba Auditorium', capacity: 2, available: true, image: kasturbaHallImage },
  { id: 2, name: 'MG Auditorium', capacity: 6, available: true, image: mgAuditoriumImage },
  { id: 3, name: 'Netaji Auditorium', capacity: 6, available: true, image: netajiImage },
  { id: 4, name: 'AB-3 Hall', capacity: 6, available: true, image: AB3Image },
  { id: 5, name: 'Main ground', capacity: 6, available: true, image: maingroundImage },
  { id: 6, name: 'AB-1 Portigo', capacity: 6, available: true, image: ab1Image },
  { id: 7, name: 'MB Amphi', capacity: 6, available: true, image: MBamphoImage },
  // Use other imported images for the rest of the listings
];

function Dashboard() {
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 1500); // Simulating loading time
  }, []);

  const openPopup = (listing) => {
    setSelectedListing(listing);
  };

  const closePopup = () => {
    setSelectedListing(null);
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const reason = bookingReason === 'Other' ? otherReason : bookingReason;
    console.log('Booking submitted:', { 
      listing: selectedListing, 
      date: bookingDate, 
      time: bookingTime,
      reason: reason
    });
    // Reset form and close popup
    setBookingDate('');
    setBookingTime('');
    setBookingReason('');
    setOtherReason('');
    closePopup();
  };

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading amazing venues...</p>
      </div>
    );
  }

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="title">Explore Stunning Venues</h1>
      <motion.div 
        className="listings-grid"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {listings.map((listing) => (
          <motion.div 
            key={listing.id} 
            className="listing-card" 
            onClick={() => openPopup(listing)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="listing-image-container">
              <img src={listing.image} alt={listing.name} className="listing-image" />
            </div>
            <div className="listing-details">
              <h2>{listing.name}</h2>
              <p><FontAwesomeIcon icon={faUsers} /> Capacity: {listing.capacity} guests</p>
              <p>
                Status: {listing.available ? 
                  <span className="available"><FontAwesomeIcon icon={faCheckCircle} /> Available</span> : 
                  <span className="booked"><FontAwesomeIcon icon={faTimesCircle} /> Booked</span>
                }
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedListing && (
          <motion.div 
            className="popup-overlay" 
            onClick={closePopup}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="popup-content" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ type: "spring", damping: 15 }}
            >
              <button className="close-btn" onClick={closePopup}>×</button>
              <img src={selectedListing.image} alt={selectedListing.name} className="popup-image" />
              <h2>{selectedListing.name}</h2>
              <p><FontAwesomeIcon icon={faUsers} /> Capacity: {selectedListing.capacity} guests</p>
              <p>
                Status: {selectedListing.available ? 
                  <span className="available"><FontAwesomeIcon icon={faCheckCircle} /> Available</span> : 
                  <span className="booked"><FontAwesomeIcon icon={faTimesCircle} /> Booked</span>
                }
              </p>
              
              <form onSubmit={handleBooking} className="booking-form">
                <h3>Book this venue</h3>
                <div className="form-group">
                  <label htmlFor="bookingDate">Date:</label>
                  <input
                    type="date"
                    id="bookingDate"
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookingTime">Time:</label>
                  <input
                    type="time"
                    id="bookingTime"
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="bookingReason">Reason for booking:</label>
                  <select
                    id="bookingReason"
                    value={bookingReason}
                    onChange={(e) => setBookingReason(e.target.value)}
                    required
                  >
                    <option value="">Select a reason</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Conference">Conference</option>
                    <option value="Workshop">Workshop</option>
                    <option value="Seminar">Seminar</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                {bookingReason === 'Other' && (
                  <div className="form-group">
                    <label htmlFor="otherReason">Please specify:</label>
                    <input
                      type="text"
                      id="otherReason"
                      value={otherReason}
                      onChange={(e) => setOtherReason(e.target.value)}
                      required
                    />
                  </div>
                )}
                <motion.button 
                  type="submit" 
                  className="book-btn"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book Now
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Dashboard;
