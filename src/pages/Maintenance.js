import React from 'react';
import './main.css';

function Maintenance() {
    return (
        <section id="maintenance" className="section">
            <h3>Maintenance</h3>
            <div className="maintenance-container">
                <div className="card">
                    <h4>Truck 2</h4>
                    <p>Last Service: 15/08/2024</p>
                </div>
                <div className="card">
                    <h4>Truck 4</h4>
                    <p>Last Service: 12/09/2024</p>
                </div>
            </div>
        </section>
    );
}

export default Maintenance;
