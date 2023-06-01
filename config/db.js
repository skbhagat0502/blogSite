const mongoose = require("mongoose");
const colors = require("colors");
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://pandadeveloperofficial:i0UYDy2WqJ0kMLoF@smashcodercluster.mrewaud.mongodb.net/SmashDB"
    );
    console.log(
      `Connected to Mongodb Database ${mongoose.connection.host}`.bgMagenta
        .white
    );
  } catch (error) {
    console.log(`MONGO Connect Error ${error}`.bgRed.white);
  }
};

module.exports = connectDB;
