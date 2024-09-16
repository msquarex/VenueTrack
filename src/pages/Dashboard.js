import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const listings = [
  { id: 1, name: 'Cozy Apartment', capacity: 2, available: true },
  { id: 2, name: 'Luxury Villa', capacity: 6, available: false },
  { id: 3, name: 'Mountain Cabin', capacity: 4, available: true },
  // Add more listings as needed
];

function Dashboard() {
  return (
    <div className="dashboard">
      <h1>Explore Listings</h1>
      <div className="listings-grid">
        {listings.map((listing) => (
          <Link to={`/listing/${listing.id}`} key={listing.id} className="listing-card">
            <h2>{listing.name}</h2>
            <p>Capacity: {listing.capacity} guests</p>
            <p>Status: {listing.available ? 'Available' : 'Booked'}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
