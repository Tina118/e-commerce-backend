const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://tripathishivangi5:shivi05@cluster0.4w3fhtz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
