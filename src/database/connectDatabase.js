const mongoose = require("mongoose");

const connectDatabase = async (uri) => {
  await mongoose.connect(uri);
};

module.exports = connectDatabase;
