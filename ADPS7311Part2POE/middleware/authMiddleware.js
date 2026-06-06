const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "No token, access denied" });
  }

  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

const employeeMiddleware = (req, res, next) => {
  if (req.user.role !== "employee") {
    return res.status(403).json({ message: "Access denied. Employees only." });
  }
  next();
};

module.exports = { authMiddleware, employeeMiddleware };