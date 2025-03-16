require("dotenv").config("../.env");

module.exports = {
  MONGOURI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EMAIL: process.env.JWT_EMAIL,
};
