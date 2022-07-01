const mongoose = require("mongoose");
const validator = require("validator");
const paymentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    ref: "User",
    required: true,
  },
  cardNo: {
    type: Number,
    required: [true, "Please Enter Your Card Number"],
  },
  expiryDate: {
    type: Date,
    required: true,
    default: Date.UTC(2023, 12),
  },
  cvv: {
    type: Number,
    required: true,
    maxlength: [3, "CVV Cannot exceed 3 characters"],
    minlength: [3, "CVV Cannot exceed 3 characters"],
  },
  amount: {
    type: Number,
    required: true,
    default: 50,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
