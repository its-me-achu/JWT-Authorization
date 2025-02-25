const express = require("express");
const bodyParser = require("body-parser");
const connectDB = require("./config/dbconfig");
 const authorRoutes = require("./routes/authorRoutes");

 require("dotenv").config();

const app = express();

//Middleware:
app.use(bodyParser.json());

//Connect to MongoDb:
connectDB();

//Routes: 
app.use("/api/user",  authorRoutes);


const PORT = process.env.PORT || 4040;
//const PORT = 2000;
app.listen(PORT, ()=>{
    console.log(`Server is Running on the port ${PORT}`);
});