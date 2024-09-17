import React, { useState, useEffect } from 'react';
import './BookingHistory.css';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const BookingHistory = () => {
	const [bookings, setBookings] = useState([]);
	const [selectedBooking, setSelectedBooking] = useState(null);
	const [searchTerm, setSearchTerm] = useState('');
	const [sortOrder, setSortOrder] = useState('newest');
	const location = useLocation();

	useEffect(() => {
		// Load existing bookings from localStorage
		const existingBookings = JSON.parse(localStorage.getItem('bookings') || '[]');

		// If there's a new booking, add it to the existing bookings
		if (location.state && location.state.newBooking) {
			const newBooking = {
				...location.state.newBooking,
				status: 'pending' // Set status to pending for new bookings
			};
			const updatedBookings = [newBooking, ...existingBookings];
			setBookings(updatedBookings);
			// Save updated bookings to localStorage
			localStorage.setItem('bookings', JSON.stringify(updatedBookings));
		} else {
			setBookings(existingBookings);
		}
	}, [location.state]);

	const handleDeleteBooking = (index) => {
		const updatedBookings = bookings.filter((_, i) => i !== index);
		setBookings(updatedBookings);
		localStorage.setItem('bookings', JSON.stringify(updatedBookings));
	};

	const filteredAndSortedBookings = bookings
		.filter(booking => booking.venueName.toLowerCase().includes(searchTerm.toLowerCase()))
		.sort((a, b) => {
			if (sortOrder === 'newest') return new Date(b.startDate) - new Date(a.startDate);
			return new Date(a.startDate) - new Date(b.startDate);
		});

	return (
		<motion.div 
			className="booking-history"
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
		>
			<h1>Your Booking History</h1>
			<div className="controls">
				<input 
					type="text" 
					placeholder="Search venues..." 
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className="search-bar"
				/>
				<select 
					value={sortOrder} 
					onChange={(e) => setSortOrder(e.target.value)}
					className="sort-dropdown"
				>
					<option value="newest">Newest First</option>
					<option value="oldest">Oldest First</option>
				</select>
			</div>
			<AnimatePresence>
				{filteredAndSortedBookings.length > 0 ? (
					<motion.div className="bookings-list">
						{filteredAndSortedBookings.map((booking, index) => (
							<motion.div 
								key={index} 
								className="booking-row"
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -20 }}
								transition={{ duration: 0.3 }}
								whileHover={{ scale: 1.03 }}
								onClick={() => setSelectedBooking(booking)}
							>
								<div className="booking-details">
									<h2>{booking.venueName}</h2>
									<p className="booking-date">Date: {new Date(booking.startDate).toLocaleString()}</p>
									<p className="booking-status">Status: {booking.status || 'pending'}</p>
									<p className="booking-reason">Reason: {booking.reason}</p>
								</div>
								<div className="delete-btn-container">
									<button onClick={(e) => { e.stopPropagation(); handleDeleteBooking(index); }} className="delete-btn">×</button>
								</div>
							</motion.div>
						))}
					</motion.div>
				) : (
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
					>
						No bookings found.
					</motion.p>
				)}
			</AnimatePresence>
			{selectedBooking && (
				<motion.div 
					className="popup-overlay"
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
				>
					<motion.div 
						className="popup-content"
						initial={{ scale: 0.8, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						exit={{ scale: 0.8, opacity: 0 }}
					>
						<button className="close-btn" onClick={() => setSelectedBooking(null)}>×</button>
						<img src={`https://source.unsplash.com/400x300/?venue,${selectedBooking.venueName}`} alt={selectedBooking.venueName} className="popup-image" />
						<h2>{selectedBooking.venueName}</h2>
						<p>Date: {new Date(selectedBooking.startDate).toLocaleString()}</p>
						<p>Status: {selectedBooking.status || 'pending'}</p>
						<p>Reason: {selectedBooking.reason}</p>
					</motion.div>
				</motion.div>
			)}
		</motion.div>
	);
};

export default BookingHistory;