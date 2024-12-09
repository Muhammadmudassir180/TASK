const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise'); // Import mysql2 to handle raw SQL queries
require('dotenv').config();

const createDatabase = async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
    });

    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${process.env.DB_NAME}\`;`);
    console.log(`Database '${process.env.DB_NAME}' ensured.`);
    await connection.end();
  } catch (error) {
    console.error('Error creating database:', error);
    throw error;
  }
};

(async () => {
  await createDatabase();
})();

const sequelize = new Sequelize(
  process.env.DB_NAME,     
  process.env.DB_USER,     
  process.env.DB_PASSWORD, 
  {
    host: process.env.DB_HOST, 
    port: process.env.DB_PORT, 
    dialect: process.env.DB_DIALECT || 'mysql',  
    logging: false,  // Disable Sequelize's logging of SQL queries
  }
);


(async () => {
  try {
    await sequelize.authenticate();  // Authenticate connection
    console.log('Connection established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

module.exports = sequelize;
