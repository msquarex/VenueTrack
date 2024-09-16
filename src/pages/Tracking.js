// src/pages/Tracking.js
import React, { useEffect, useState } from 'react';
import GoogleMapReact from 'google-map-react';
import './Tracking.css';

const TruckMarker = ({ text }) => (
  <div className="truck-marker">
    🚚
    <span>{text}</span>
  </div>
);

const Tracking = () => {
  const [trucks, setTrucks] = useState([]);

  useEffect(() => {
    // Fetch truck data from API
    const fetchTruckData = async () => {
      // Replace with your API call
      const response = await fetch('/api/trucks');
      const data = await response.json();
      setTrucks(data);
    };

    fetchTruckData();

    // Set up polling or use WebSockets for real-time updates
  }, []);

  const defaultProps = {
    center: {
      lat: 20.5937, // Center of India
      lng: 78.9629,
    },
    zoom: 5,
  };

  return (
    <div className="tracking-page">
      <h2>Real-Time Truck Tracking</h2>
      <div className="map-container">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyD6hQdNT_Ampq3wDEy4-u_jLYgNjGrjIVw' }}
          defaultCenter={defaultProps.center}
          defaultZoom={defaultProps.zoom}
        >
          {trucks.map(truck => (
            <TruckMarker
              key={truck.id}
              lat={truck.latitude}
              lng={truck.longitude}
              text={truck.id}
            />
          ))}
        </GoogleMapReact>
      </div>
    </div>
  );
};

export default Tracking;
// // In Tracking.js or Dashboard.js
// import io from 'socket.io-client';

// useEffect(() => {
//   const socket = io('http://your-backend-server.com');

//   socket.on('truckData', (data) => {
//     setTrucks(data);
//   });

//   return () => {
//     socket.disconnect();
//   };
// }, []);
