const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  email: {
    type: String,
    required: true,
    minlength: 6,
    maxlength: 256,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024,
  },
  biz: {
    type: Boolean,
    default: false,
    required: true,
  },
  address: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 256,
  },
  phone: {
    type: String,
    minlength: 9,
    maxlength: 14,
  },
  bank: {
    type: String,
    required: false,
  },
  bankNumber: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 256,
  },
  createdAt: { type: Date, default: Date.now },
  isAdmin: { type: Boolean, default: false },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
