const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "Please enter your first name"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter your last name"],
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
    required: [true, "Invalid user role"],
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  email: {
    type: String,
    required: [true, "Please enter a valid email"],
  },
  mobile: {
    type: String, //because of + is a string
  },
  city: {
    type: String,
  },
  state: {
    type: String,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
