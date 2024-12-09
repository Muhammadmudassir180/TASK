const fs = require('fs');
const csvParser = require('csv-parser');
const sequelize = require('./database');
const { QueryTypes } = require('sequelize');

const saveCsvToDb = async (filePath, tableName) => {
  try {
    const data = [];
    let headers = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('headers', (headerList) => {
        headers = headerList;
      })
      .on('data', (row) => {
        data.push(row);
      })
      .on('end', async () => {
        console.log('CSV file successfully processed.');

        // Dynamically create a table using headers
        const createTableQuery = `
          CREATE TABLE IF NOT EXISTS ${tableName} (
            id INT AUTO_INCREMENT PRIMARY KEY,
            ${headers
              .map((header) => `\`${header}\` VARCHAR(255)`)
              .join(', ')}
          );
        `;
        await sequelize.query(createTableQuery, { type: QueryTypes.RAW });

        console.log(`Table '${tableName}' created successfully.`);

        // Insert data into the table
        for (const row of data) {
          const keys = Object.keys(row).map((key) => `\`${key}\``).join(', ');
          const values = Object.values(row)
            .map((value) => `'${value.replace(/'/g, "''")}'`) 
            .join(', ');

          const insertQuery = `
            INSERT INTO ${tableName} (${keys})
            VALUES (${values});
          `;
          await sequelize.query(insertQuery, { type: QueryTypes.RAW });
        }

        console.log(`Data successfully saved to table '${tableName}'.`);
        await sequelize.close();
      })
      .on('error', async (error) => {
        console.error('Error processing CSV:', error);
        await sequelize.close();
      });
  } catch (error) {
    console.error('Error saving data:', error);
    await sequelize.close();
  }
};


saveCsvToDb('./car_data.csv', 'cars'); 
