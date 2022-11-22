const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  password: String,
  username: {
    type: String,
    unique: true,
    match: [/^[a-zA-Z0-9]+$/, "please use a valid   username"],
    trim: true,
  },
});
const User = mongoose.model("User", userSchema);
module.exports = User;
