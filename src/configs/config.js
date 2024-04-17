require("dotenv").config();

const {
  PORT_NUMBER,
  JWT_SECRET_KEY,
  JWT_TOKEN_EXPIRATION_TIME,
  MongoDB_URI,
  chronos_test_db,
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM
} = process.env;
console.log("Port inside config.js--->",PORT_NUMBER)
module.exports = {
  PORT_NUMBER,
  JWT_SECRET_KEY,
  JWT_TOKEN_EXPIRATION_TIME,
  MongoDB_URI,
  chronos_test_db,
  EMAIL_SERVICE,
  EMAIL_USER,
  EMAIL_PASS,
  EMAIL_FROM
};