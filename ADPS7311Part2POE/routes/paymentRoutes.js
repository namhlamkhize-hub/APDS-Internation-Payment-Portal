const express = require("express");
const { authMiddleware, employeeMiddleware } = require("../middleware/authMiddleware");
const Payment = require("../models/Payment");
const { paymentValidation, validate } = require("../middleware/validators");

const router = express.Router();

// Create payment (customers only)
router.post("/", authMiddleware, paymentValidation, validate, async (req, res) => {
  try {
    const { amount, currency, provider, accountInfo, swiftCode } = req.body;

    const payment = new Payment({
      userId: req.user.id,
      amount,
      currency,
      provider,
      accountInfo,
      swiftCode,
      verified: false,
    });

    await payment.save();
    res.json({ message: "Payment created successfully", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get own payments (customers)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find({ userId: req.user.id });
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get ALL payments (employees only)
router.get("/all", authMiddleware, employeeMiddleware, async (req, res) => {
  try {
    const payments = await Payment.find();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify a payment (employees only)
router.put("/:id/verify", authMiddleware, employeeMiddleware, async (req, res) => {
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { verified: true, verifiedBy: req.user.username },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: "Payment not found" });
    }

    res.json({ message: "Payment verified successfully", payment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;