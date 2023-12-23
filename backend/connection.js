const mongoose = require("mongoose");
const api_config = require("./config");

const url = api_config.dbUrl;

// it reutrns a promise
mongoose
  .connect(url)
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => {
    console.error(err);
  });

module.exports = mongoose;