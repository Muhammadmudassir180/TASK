// File: src/Components/Grid/Grid.js
import React from 'react';
import './Grid.css'; // Import the CSS for styling

const Grid = ({ carData }) => {
  return (
    <div className="car-data-container">
      <div className="car-grid">
        {carData.length > 0 ? (
          carData.map((car, index) => (
            <div key={index} className="car-item">
              <h3>{car.Car_Name} ({car.Year})</h3>
                <p>Selling_Price: {car.Selling_Price}</p>
                <p>Present_Price: {car.Present_Price}</p>
              <p>Fuel Type: {car.Fuel_Type}</p>
              <p>Transmission: {car.Transmission}</p>
              <p>Owner: {car.Owner}</p>
            </div>
          ))
        ) :<></>}
      </div>
    </div>
  );
};

export default Grid;
