// // src/pages/DriverInfo.js
// import React from 'react';
// import './DriverInfo.css'; // Import the CSS file for styling

// const DriverInfo = () => {
//   return (
//     <div className="driver-info-container">
//       <h2>Driver Info</h2>
//       {/* Driver info content goes here */}
//     </div>
//   );
// };


import React, { useState } from 'react';
import './main.css';

function DriverDetails() {
    const [driverDetails, setDriverDetails] = useState('');

    const showDriverDetails = (driver) => {
        const details = {
            john: '<h4>John Doe</h4><p>Trips: 12</p><p>Rating: 4.5</p>',
            jane: '<h4>Jane Smith</h4><p>Trips: 8</p><p>Rating: 4.8</p>'
        };
        setDriverDetails(details[driver] || '<p>Select a driver to see details.</p>');
    };

    return (
        <section id="driver-details" className="section">
            <h3>Driver Details</h3>
            <div className="dropdown-container">
                <select onChange={(e) => showDriverDetails(e.target.value)}>
                    <option value="">Select Driver</option>
                    <option value="john">John Doe</option>
                    <option value="jane">Jane Smith</option>
                </select>
            </div>
            <div id="driverDetails" className="driver-details" dangerouslySetInnerHTML={{ __html: driverDetails }}>
            </div>
        </section>
    );
}

export default DriverDetails;
