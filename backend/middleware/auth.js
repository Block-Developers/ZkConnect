// middleware/auth.js
const jwt = require("jsonwebtoken");

// Middleware to verify the JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // Verify the token
  jwt.verify(token, "carbonrelay", (err, decodedToken) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Save the user ID from the token to req.userId
    req.userId = decodedToken.userId;

    next();
  });
};
