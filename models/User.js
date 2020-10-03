const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    unique: true,
    required: true,
  },
  isConfirmed: {
    type: Boolean,
    required: true,
    default: false,
  },
});
module.exports = mongoose.model("User", userSchema);
