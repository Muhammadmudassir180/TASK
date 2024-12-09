import React from 'react';

const CarList = ({ cars }) => {
  return (
    <div>
      {cars.length === 0 ? (
        <p>No cars found</p>
      ) : (
        cars.map((car, index) => (
          <div key={index}>
            <h3>{car.Car_Name}</h3>
            <p>{car.Year}</p>
            <p>{car.Selling_Price}</p>
            <p>{car.Present_Price}</p>
            <p>{car.Fuel_Type}</p>
            <p>{car.Kms_Driven}</p>
            <p>{car.Seller_Type}</p>
            <p>{car.Transmission}</p>
            <p>{car.Owner}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default CarList;
