const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  username: String,
  email: String,
  phone: String,
  website: String
});

module.exports = mongoose.model("User", userSchema);