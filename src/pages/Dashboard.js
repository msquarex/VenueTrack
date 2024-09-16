import React, { useState } from 'react';
import './Dashboard.css';

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

  const openPopup = (listing) => {
    setSelectedListing(listing);
  };

  const closePopup = () => {
    setSelectedListing(null);
  };

  return (
    <div className="dashboard">
      <h1>Explore Listings</h1>
      <div className="listings-grid">
        {listings.map((listing) => (
          <div key={listing.id} className="listing-card" onClick={() => openPopup(listing)}>
            <div className="listing-image-container">
              <img src={listing.image} alt={listing.name} className="listing-image" />
            </div>
            <div className="listing-details">
              <h2>{listing.name}</h2>
              <p>Capacity: {listing.capacity} guests</p>
              <p>Status: {listing.available ? 'Available' : 'Booked'}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedListing && (
        <div className="popup-overlay">
          <div className="popup-content">
            <button className="close-btn" onClick={closePopup}>×</button>
            <img src={selectedListing.image} alt={selectedListing.name} className="popup-image" />
            <h2>{selectedListing.name}</h2>
            <p>Capacity: {selectedListing.capacity} guests</p>
            <p>Status: {selectedListing.available ? 'Available' : 'Booked'}</p>
            {/* Add more options or booking functionality here */}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
