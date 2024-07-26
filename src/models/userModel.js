const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcryptjs");

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

userSchema.pre("save", async function () {
  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(this.password, salt);
  this.password = hashedPassword;
});

userSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  return isMatch;
};

module.exports = mongoose.model("User", userSchema);
