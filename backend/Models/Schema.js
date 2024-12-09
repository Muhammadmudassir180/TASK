const { DataTypes } = require('sequelize');
const sequelize = require("../database");

const Car = sequelize.define('Car', {
    Car_Name: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    Present_Price: {
        type: DataTypes.STRING,
        allowNull: false,        
    },
    Selling_Price:{
        type: DataTypes.STRING,
        allowNull: false,        
    },
  model: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  year: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    },
    Fuel_Type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Kms_Driven: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Transmission: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    Seller_Type: {
        type: DataTypes.STRING,
        allowNull: false,
      },
});

module.exports = Car;
