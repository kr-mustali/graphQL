require("dotenv").config();
const mongoose = require("mongoose");
const uri = process.env.MONODB_URI;

async function connectToDatabase() {
  try {
    await mongoose.connect(uri);

    console.log("MongoDb connected");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

module.exports = connectToDatabase;
