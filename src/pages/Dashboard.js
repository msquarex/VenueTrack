// // src/pages/Dashboard.js
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './Dashboard.css'; // Import the CSS file for styling

// const Dashboard = () => {
//   const [trucks, setTrucks] = useState([
//     { id: 'T001', driverName: 'John Doe', otherInfo: 'Some info' },
//     { id: 'T002', driverName: 'Jane Smith', otherInfo: 'Some info' },
//     // Add more trucks as needed
//   ]);

//   return (
//     <div className="dashboard-container">
//       <h2>Dashboard</h2>
//       <button className="add-truck-button">
//         <Link to="/add-truck">Add Truck</Link>
//       </button>
//       <table className="trucks-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Driver Name</th>
//             <th>Other Info</th>
//           </tr>
//         </thead>
//         <tbody>
//           {trucks.map((truck) => (
//             <tr key={truck.id}>
//               <td>{truck.id}</td>
//               <td>{truck.driverName}</td>
//               <td>{truck.otherInfo}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Dashboard;
import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './main.css';

function Home() {
    useEffect(() => {
        var ctx = document.getElementById('fuelChart').getContext('2d');
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                datasets: [{
                    label: 'Fuel Consumption',
                    data: [100, 90, 80, 85, 70, 75],
                    backgroundColor: 'rgba(102, 165, 173, 0.5)',
                    borderColor: '#66A5AD',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);

    return (
        <section id="home" className="section">
            <h3>Dashboard Overview</h3>
            <div className="quick-stats">
                <div className="card">
                    <h4>Total Trucks</h4>
                    <p>35</p>
                </div>
                <div className="card">
                    <h4>Total Drivers</h4>
                    <p>27</p>
                </div>
                <div className="card">
                    <h4>Trips Completed</h4>
                    <p>256</p>
                </div>
                <div className="card">
                    <h4>Alerts</h4>
                    <p>3 Active Alerts</p>
                </div>
            </div>
            <div className="recent-activity">
                <h4>Recent Activity</h4>
                <ul>
                    <li>Truck 1: Started trip to City X</li>
                    <li>Truck 5: Completed trip to City Y</li>
                    <li>Truck 2: Scheduled for maintenance</li>
                </ul>
            </div>
            <div className="chart-container">
                <canvas id="fuelChart"></canvas>
            </div>
        </section>
    );
}

export default Home;
