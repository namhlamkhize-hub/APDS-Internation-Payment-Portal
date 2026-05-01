require("dotenv").config();

const express = require("express");
const connectDB = require("./config/db"); 
const authRoutes = require("./routes/authRoutes");   
const paymentRoutes = require("./routes/paymentRoutes");

const app = express(); 
app.use(express.json());

// connect to database
connectDB(); 
 
app.use("/api/auth", authRoutes); 
app.use("/api/payments", paymentRoutes);

app.get("/api/health", (req, res) => {
  res.json({ message: "Backend API is running" });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});