const express = require('express');
const router = express.Router();
const { QueryTypes } = require('sequelize');  
const sequelize = require('./database');  

// Define your route to fetch car data based on the search query
router.get("/", async (req, res) => {
  if (!sequelize) {
    return res.status(500).send('Database connection not established.');
  }

  const { query } = req.query;  // Get the search query from the request

  if (!query) {
    return res.status(400).json({ message: 'Query is required' });
  }

  try {
    // Query to fetch car data based on the search query
    const cars = await sequelize.query(
      "SELECT `Car_Name`, `Year`, `Selling_Price`, `Present_Price`, `Kms_Driven`, `Fuel_Type`, `Seller_Type`, `Transmission`, `Owner` FROM `Cars` WHERE `Car_Name` LIKE :query",  
      {
        replacements: { query: `%${query}%` },  
        type: QueryTypes.SELECT,  
      }
    );

    if (cars.length === 0) {
      return res.status(404).json({ message: 'No cars found' });
    }

    res.json(cars); 
  } catch (error) {
    console.error("Error fetching data from database:", error);
    res.status(500).send("Error fetching data from database.");
  }
});

module.exports = router;
