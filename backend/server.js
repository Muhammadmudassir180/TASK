const express = require("express"); 
const app = express();
const cors = require('cors');
const carRoute=require("./routes")

const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;

app.use(express.json())
app.use(cors())
app.use("/car",carRoute)


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);

})
