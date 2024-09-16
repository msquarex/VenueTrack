import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import './main.css';

function FuelConsumption() {
    useEffect(() => {
        var ctx = document.getElementById('fuelConsumptionChart').getContext('2d');
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Truck 1', 'Truck 2', 'Truck 3', 'Truck 4', 'Truck 5'],
                datasets: [{
                    label: 'Fuel Usage (Liters)',
                    data: [450, 350, 300, 500, 400],
                    backgroundColor: '#C4DFE6',
                    borderColor: '#66A5AD',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    tooltip: {
                        callbacks: {
                            afterBody: function (tooltipItems) {
                                const truckData = {
                                    'Truck 1': 'On 01/09/2024: 50 liters, 250 km',
                                    'Truck 2': 'On 15/08/2024: 30 liters, 200 km',
                                };
                                return truckData[tooltipItems[0].label] || '';
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }, []);

    return (
        <section id="fuel-consumption" className="section">
            <h3>Fuel Consumption</h3>
            <div className="chart-container">
                <canvas id="fuelConsumptionChart"></canvas>
            </div>
        </section>
    );
}

export default FuelConsumption;
