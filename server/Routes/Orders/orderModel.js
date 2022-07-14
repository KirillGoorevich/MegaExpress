const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  card:{
    image: {
      url: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 1024,
      },
      alt: { type: String, required: true, minlength: 2, maxlength: 256 },
    },
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
    bizName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
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
    sellerId: {
      type: String,
      required: true,
    },
    cardId: {
      type: String,
      required: true,
    },
  },
  data:{
    selectedFeature: {
      type: String,
      required: true,
    },
    displayPrice: {
      type: Number,
      required: true,
    },
    displayColor: {
      type: String,
      required: true,
    },
    displayColor: {
      type: String,
      required: true,
    },
    selectedQuantity:{
      type: Number,
      required: true,
    },
    selectedCountry: {
      type: String,
      required: true,
    },
    name:{
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    phone: {
      type: String,
      required: true,
      minlength: 9,
      maxlength: 14,
    },
    address: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 256,
    },
    cardNumber: {
      type: String,
      required: true,
      minlength: 16,
      maxlength: 16,
    },
    cardName: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    validMonth: {
      type: String,
      required: true,
    },
    validYear: {
      type: String,
      required: true,
    },
    cvv: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 4,
    }
  },
  buyerId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  deliveryDate: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("order", orderSchema);

exports.Order = Order;
