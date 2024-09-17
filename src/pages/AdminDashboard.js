import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    // Load all bookings from localStorage
    const storedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(storedBookings);
  }, []);

  const handleBookingAction = (index, action) => {
    const updatedBookings = [...bookings];
    updatedBookings[index].status = action === 'approve' ? 'approved' : 'declined';
    
    // Update localStorage
    localStorage.setItem('bookings', JSON.stringify(updatedBookings));

    // Update state
    setBookings(updatedBookings);
  };

  const filteredBookings = bookings.filter(booking => 
    filter === 'all' || booking.status === filter || (filter === 'pending' && !booking.status)
  );

  return (
    <motion.div 
      className="admin-dashboard"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1>Admin Dashboard</h1>
      <div className="filter-buttons">
        {['all', 'pending', 'approved', 'declined'].map(status => (
          <motion.button
            key={status}
            className={`filter-btn ${filter === status ? 'active' : ''}`}
            onClick={() => setFilter(status)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </motion.button>
        ))}
      </div>
      <div className="booking-requests">
        <AnimatePresence>
          {filteredBookings.length === 0 ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              No bookings found.
            </motion.p>
          ) : (
            filteredBookings.map((booking, index) => (
              <motion.div 
                key={index} 
                className={`booking-request ${booking.status || 'pending'}`}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -50, opacity: 0 }}
                transition={{ delay: index * 0.1 }}
                layout
              >
                <h3>{booking.venueName}</h3>
                <p>Date: {new Date(booking.startDate).toLocaleString()}</p>
                <p className="status">
                  Status: 
                  {booking.status === 'approved' && <FaCheckCircle className="icon approved" />}
                  {booking.status === 'declined' && <FaTimesCircle className="icon declined" />}
                  {(!booking.status || booking.status === 'pending') && <FaClock className="icon pending" />}
                  {booking.status || 'pending'}
                </p>
                <p>Reason: {booking.reason}</p>
                {(booking.status === 'pending' || !booking.status) && (
                  <div className="action-buttons">
                    <motion.button 
                      className="approve-btn"
                      onClick={() => handleBookingAction(index, 'approve')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Approve
                    </motion.button>
                    <motion.button 
                      className="decline-btn"
                      onClick={() => handleBookingAction(index, 'decline')}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Decline
                    </motion.button>
                  </div>
                )}
              </motion.div>
            ))
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default AdminDashboard;