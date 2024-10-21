// Database/db.js
require("dotenv").config(); // Ensure this is here to load environment variables
const mongoose = require("mongoose");
const mongoURI = process.env.MONGODB_URI;

const connectToMongo = () => {
  console.log("Mongo URI:", mongoURI); // Debugging line to check if mongoURI is loaded
  mongoose
    .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log("Connected to MongoDB Successfully");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB", error);
    });
};

module.exports = connectToMongo;
