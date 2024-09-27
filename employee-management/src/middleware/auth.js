const jwt = require('jsonwebtoken');
const JWT_SECRET = '1dFkklKjg++349rJKLmYH$#!Ufy19sl%j09Blm2#KaLi'; // Use a secure secret in production

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Expecting "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: 'Access denied, no token provided' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Add user info to the request object
    next(); // Move to the next middleware/route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

module.exports = verifyToken;
