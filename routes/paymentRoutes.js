const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Payment = require("../models/Payment");

const router = express.Router();

// Create payment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { amount, currency, provider, accountInfo, swiftCode } = req.body;

    const payment = new Payment({
      userId: req.user.id,
      amount,
      currency,
      provider,
      accountInfo,
      swiftCode,
    });

    await payment.save();

    res.json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}); 
 
// Get user payments
router.get("/", authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id });

    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;