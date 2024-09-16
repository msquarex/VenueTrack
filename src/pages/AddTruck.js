// src/pages/AddTruck.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AddTruck.css'; // Import the CSS file for styling

const AddTruck = () => {
  const [truckId, setTruckId] = useState('');
  const [driverName, setDriverName] = useState('');
  const [otherInfo, setOtherInfo] = useState('');
  const navigate = useNavigate();

  const handleAddTruck = (e) => {
    e.preventDefault();
    // Logic to add the truck (e.g., send to API or local storage)
    navigate('/dashboard'); // Redirect to the dashboard after adding the truck
  };

  return (
    <div className="add-truck-container">
      <h2>Add Truck</h2>
      <form onSubmit={handleAddTruck}>
        <div className="form-group">
          <label htmlFor="truckId">Truck ID</label>
          <input
            type="text"
            id="truckId"
            value={truckId}
            onChange={(e) => setTruckId(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="driverName">Driver Name</label>
          <input
            type="text"
            id="driverName"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="otherInfo">Other Info</label>
          <input
            type="text"
            id="otherInfo"
            value={otherInfo}
            onChange={(e) => setOtherInfo(e.target.value)}
          />
        </div>
        <button type="submit">Add Truck</button>
      </form>
    </div>
  );
};

export default AddTruck;
