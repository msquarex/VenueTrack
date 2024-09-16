import React from 'react';

function Alerts() {
    return (
        <section id="alerts" className="section">
            <h3>Alerts & Notifications</h3>
            <div className="alerts-container">
                <div className="alert-card">
                    <h4>Truck 1</h4>
                    <p>Overdue Maintenance</p>
                </div>
                <div className="alert-card">
                    <h4>Truck 3</h4>
                    <p>Speeding Alert</p>
                </div>
                <div className="alert-card">
                    <h4>Truck 5</h4>
                    <p>High Fuel Consumption</p>
                </div>
            </div>
        </section>
    );
}

export default Alerts;
