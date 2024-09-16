import React, { useState } from 'react';
import './BookingHistory.css'; // Import CSS for styles and transitions

// Import images from the assets
import kasturbaHallImage from '../assets/kasturba-hall.jpg';
import mgAuditoriumImage from '../assets/MG-Auditorium.jpg';
import netajiImage from '../assets/Nethaji-Auditorium.jpg';
import AB3Image from '../assets/Ab-3 Hall.jpeg';

// Updated bookings data (limited to 4)
const initialBookingsData = [
    { id: 1, date: '2023-10-01', destination: 'Kasturba Auditorium', status: 'Completed', image: kasturbaHallImage },
    { id: 2, date: '2023-10-05', destination: 'MG Auditorium', status: 'Pending', image: mgAuditoriumImage },
    { id: 3, date: '2023-10-10', destination: 'Netaji Auditorium', status: 'Completed', image: netajiImage },
    { id: 4, date: '2023-10-15', destination: 'AB-3 Hall', status: 'Cancelled', image: AB3Image },
];

const BookingHistory = () => {
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [sortOption, setSortOption] = useState('date');

    const openPopup = (booking) => {
        setSelectedBooking(booking);
    };

    const closePopup = () => {
        setSelectedBooking(null);
    };

    // Filter and sort bookings
    const filteredBookings = initialBookingsData
        .filter(booking => booking.destination.toLowerCase().includes(searchTerm.toLowerCase()))
        .sort((a, b) => {
            if (sortOption === 'date') {
                return new Date(a.date) - new Date(b.date);
            } else {
                return a.status.localeCompare(b.status);
            }
        });

    return (
        <div className="booking-history">
            <h1>Your Booking History</h1>
            <div className="controls">
                <input
                    type="text"
                    placeholder="Search by destination..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="search-bar"
                />
                <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="sort-dropdown">
                    <option value="date">Sort by Date</option>
                    <option value="status">Sort by Status</option>
                </select>
            </div>
            <div className="bookings-list">
                {filteredBookings.map(booking => (
                    <div key={booking.id} className="booking-row" onClick={() => openPopup(booking)}>
                        <div className="booking-details">
                            <h2>{booking.destination}</h2>
                            <p className="booking-date">{booking.date}</p>
                            <p className="booking-status">{booking.status}</p>
                        </div>
                        <img src={booking.image} alt={booking.destination} className="booking-image" />
                    </div>
                ))}
            </div>

            {selectedBooking && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="close-btn" onClick={closePopup}>×</button>
                        <img src={selectedBooking.image} alt={selectedBooking.destination} className="popup-image" />
                        <h2>{selectedBooking.destination}</h2>
                        <p>Date: {selectedBooking.date}</p>
                        <p>Status: {selectedBooking.status}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BookingHistory;