import React from 'react';
import './PricingTable.css';

const PricingTable = () => {
  const pricingData = [
    {
      service: 'Full-Day (8:00 AM - 6:00 PM)',
      daily: '₹800.00',
      weekly: '₹3,500.00',
      monthly: '₹12,000.00',
    },
    {
      service: 'Half Day (8:00 AM - 2:00 PM or 3:00 PM - 6:00 PM)',
      daily: '₹500.00',
      weekly: '₹2,000.00',
      monthly: '₹7,000.00',
    },
    {
      service: 'Food Expenses Paid Per Day',
      daily: '₹150.00',
      weekly: '₹750.00',
      monthly: '₹2,500.00',
    },
    {
      service: 'Activities',
      daily: '₹100.00',
      weekly: '₹400.00',
      monthly: '₹1,500.00',
    }
  ];

  return (
    <div className="PricingTable-container">
      <div className="PricingTable-wrapper">
        <table className="PricingTable-table">
          <thead>
            <tr>
              <th className="PricingTable-th">Preschool</th>
              <th className="PricingTable-th">Daily</th>
              <th className="PricingTable-th">Weekly</th>
              <th className="PricingTable-th">Monthly</th>
            </tr>
          </thead>
          <tbody>
            {pricingData.map((row, index) => (
              <tr key={index} className="PricingTable-tr">
                <td className="PricingTable-td PricingTable-service">{row.service}</td>
                <td className="PricingTable-td">{row.daily}</td>
                <td className="PricingTable-td">{row.weekly}</td>
                <td className="PricingTable-td">{row.monthly}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="PricingTable-footer-note">
        The preschool reserves the right to increase the said fees at any time.
      </p>
    </div>
  );
};

export default PricingTable;