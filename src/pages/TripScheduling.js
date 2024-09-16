import React, { useState } from 'react';
import './main.css';

function TripScheduling() {
    const [tripDetails, setTripDetails] = useState('');

    const showTripDetails = (truck) => {
        const details = {
            truck1: '<h4>Truck 1 - City A to City B</h4><p>Date: 12/09/2024</p>',
            truck2: '<h4>Truck 2 - City C to City D</h4><p>Date: 15/09/2024</p>'
        };
        setTripDetails(details[truck] || '<p>Select a truck to see details.</p>');
    };

    return (
        <section id="trip-scheduling" className="section">
            <h3>Trip Scheduling</h3>
            <div className="dropdown-container">
                <select onChange={(e) => showTripDetails(e.target.value)}>
                    <option value="">Select Truck</option>
                    <option value="truck1">Truck 1</option>
                    <option value="truck2">Truck 2</option>
                </select>
            </div>
            <div id="tripDetails" className="trip-details" dangerouslySetInnerHTML={{ __html: tripDetails }}>
            </div>
        </section>
    );
}

export default TripScheduling;
