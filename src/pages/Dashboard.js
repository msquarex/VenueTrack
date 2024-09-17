import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faCheckCircle, faTimesCircle, faFilter } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { auth } from '../firebase';
import { bookVenue } from '../db';

import kasturbaHallImage from '../assets/kasturba-hall.jpg';
import mgAuditoriumImage from '../assets/MG-Auditorium.jpg';
import netajiImage from '../assets/Nethaji-Auditorium.jpg';
import AB3Image from '../assets/Ab-3 Hall.jpeg';
import maingroundImage from '../assets/main-ground.png';
import ab1Image from '../assets/ab-1 portigo.jpeg';
import MBamphoImage from '../assets/mb-amphi.jpeg';
// Import other images similarly

function Dashboard() {
  const [listings, setListings] = useState([]);
  const [selectedListing, setSelectedListing] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [bookingTime, setBookingTime] = useState('');
  const [bookingReason, setBookingReason] = useState('');
  const [otherReason, setOtherReason] = useState('');
  const [capacityFilter, setCapacityFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('');
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const fetchVenues = async () => {
    try {
      const venuesCollection = collection(db, 'venues');
      const venueSnapshot = await getDocs(venuesCollection);
      const venueList = venueSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        image: getVenueImage(doc.data().name),
        status: doc.data().status === 'booked' ? 'booked' : 'available'
      }));
      setListings(venueList);
    } catch (error) {
      console.error("Error fetching venues:", error);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  // Helper function to get the correct image based on venue name
  const getVenueImage = (venueName) => {
    switch(venueName) {
      case 'Kasturba Auditorium': return kasturbaHallImage;
      case 'MG Auditorium': return mgAuditoriumImage;
      case 'Netaji Auditorium': return netajiImage;
      case 'AB-3 Hall': return AB3Image;
      case 'Main ground': return maingroundImage;
      case 'AB-1 Portico': return ab1Image;
      case 'MB Amphitheatre': return MBamphoImage;
      default: return null;
    }
  };

  const openPopup = (listing) => {
    setSelectedListing(listing);
  };

  const closePopup = () => {
    setSelectedListing(null);
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    console.log('Booking attempt started');

    const reason = bookingReason === 'Other' ? otherReason : bookingReason;
    const bookingData = {
      startDate: new Date(bookingDate + 'T' + bookingTime),
      status: 'booked',
      reason: reason,
      venueId: selectedListing.id,
      venueName: selectedListing.name,
    };

    // Show success popup
    setShowSuccessPopup(true);

    // Reset form and close popup
    setBookingDate('');
    setBookingTime('');
    setBookingReason('');
    setOtherReason('');
    closePopup();

    // Redirect to booking history page after 2 seconds
    setTimeout(() => {
      navigate('/booking-history', { state: { newBooking: bookingData } });
    }, 2000);
  };

  const filteredListings = listings.filter(listing => {
    return (
      (capacityFilter === '' || listing.capacity >= parseInt(capacityFilter)) &&
      (locationFilter === '' || listing.location === locationFilter) &&
      (availabilityFilter === '' || listing.status === availabilityFilter)
    );
  });

  return (
    <motion.div 
      className="dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="title">Explore Stunning Venues</h1>

      <div className="filter-section">
        <h2><FontAwesomeIcon icon={faFilter} /> Filter Venues</h2>
        <div className="filter-controls">
          <select
            value={capacityFilter}
            onChange={(e) => setCapacityFilter(e.target.value)}
          >
            <option value="">All Capacities</option>
            <option value="100">100+ guests</option>
            <option value="200">200+ guests</option>
            <option value="500">500+ guests</option>
          </select>
          <select
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            <option value="Main Campus">Main Campus</option>
            <option value="North Campus">North Campus</option>
            <option value="South Campus">South Campus</option>
          </select>
          <select
            value={availabilityFilter}
            onChange={(e) => setAvailabilityFilter(e.target.value)}
          >
            <option value="">All Availabilities</option>
            <option value="true">Available</option>
            <option value="false">Booked</option>
          </select>
        </div>
      </div>

      <motion.div 
        className="listings-grid"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {filteredListings.map((listing) => (
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
                Status: {listing.status === 'available' ? 
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
                Status: {selectedListing.status === 'available' ? 
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

      {showSuccessPopup && (
        <div className="popup-overlay">
          <div className="success-popup">
            <h3>Booking Successful!</h3>
            <p>Your venue has been booked. Redirecting to booking history...</p>
          </div>
        </div>
      )}

      {errorMessage && <div className="error-message">{errorMessage}</div>}
    </motion.div>
  );
}

export default Dashboard;
