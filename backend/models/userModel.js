const mongoose = require("../connection");

const schema = new mongoose.Schema({
  username: String,
  email: String,
  contact: String,
  age: Number,
  password: String,
});

const model = mongoose.model("users", schema);

module.exports = model;