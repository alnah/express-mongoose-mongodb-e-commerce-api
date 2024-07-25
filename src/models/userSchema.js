const mongoose = require("mongoose");
const { isEmail } = require("validator");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required. Please enter your name."],
    minLength: 3,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, "Email is required. Please enter a valid email address."],
    validate: isEmail,
  },
  password: {
    type: String,
    required: [true, "Password is required. Please enter a password."],
    minLength: 6,
  },
  role: {
    type: String,
    enum: ["admin", "user"],
    default: "user",
  },
});

module.exports = mongoose.model("User", userSchema);
