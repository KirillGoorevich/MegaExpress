const mongoose = require("mongoose");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
  },
  image: {
    url: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 1024,
    },
    alt: { type: String, required: true, minlength: 2, maxlength: 256 },
  },
  likes: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  subcategory: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  bizNumber: {
    type: String,
    minlength: 7,
    maxlength: 7,
    required: true,
  },
  bizName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  sold: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  ship: {
    type: Number,
    required: true,
  },
  returnfree: {
    type: String,
    required: true,
  },
  numFeatures: {
    type: Number,
    required: true,
  },
  feature1: {
    type: String,
    required: false,
  },
  feature2: {
    type: String,
    required: false,
  },
  feature2price:{
    type: Number,
    required: false,
  },
  feature3: {
    type: String,
    required: false,
  },
  feature3price:{
    type: Number,
    required: false,
  },
  feature4: {
    type: String,
    required: false,
  },
  feature4price:{
    type: Number,
    required: false,
  },
  feature5: {
    type: String,
    required: false,
  },
  feature5price:{
    type: Number,
    required: false,
  },
  numColors: {
    type: Number,
    required: true,
  },
  color1: {
    type: String,
    required: false,
  },
  color2: {
    type: String,
    required: false,
  },
  image2: {
    url: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 1024,
    },
    alt: { type: String, required: false, minlength: 2, maxlength: 256 },
  },
  color3: {
    type: String,
    required: false,
  },
  image3: {
    url: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 1024,
    },
    alt: { type: String, required: false, minlength: 2, maxlength: 256 },
  },
  color4: {
    type: String,
    required: false,
  },
  image4: {
    url: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 1024,
    },
    alt: { type: String, required: false, minlength: 2, maxlength: 256 },
  },
  color5: {
    type: String,
    required: false,
  },
  image5: {
    url: {
      type: String,
      required: false,
      minlength: 2,
      maxlength: 1024,
    },
    alt: { type: String, required: false, minlength: 2, maxlength: 256 },
  },
  quantity: {
    type: Number,
    required: true,
  },
  cart: [String],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  sellerId: {
    type: String,
    required: true,
  },
});

const Card = mongoose.model("card", cardSchema);

exports.Card = Card;
