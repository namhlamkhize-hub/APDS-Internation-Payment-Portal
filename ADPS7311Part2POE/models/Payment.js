const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  provider: {
    type: String,
    required: true,
  },
  accountInfo: {
    type: String,
    required: true,
  },
  swiftCode: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  verifiedBy: {
    type: String,
    default: null,
  },
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);