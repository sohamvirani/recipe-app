const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware for user authentication
exports.authenticate = async (req, res, next) => {
  try {
    // Retrieve the token from cookies or the Authorization header
    const token = req.cookies['recipe'] || req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ success: false, message: 'Authorization failed, token not found' });
    }

    // Decode and verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user associated with the userId in the token
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User does not exist' });
    }

    // Attach the user information to the request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error during authentication:", error.message);
    return res.status(401).json({ success: false, message: 'Token is invalid or has expired' });
  }
};

// Middleware to check if the user has the required role
exports.IsUser = (req, res, next) => {
  // Verify that req.user is present
  if (!req.user) {
    return res.status(401).json({ success: false, message: "Unauthorized, user not identified" });
  }

  // Check if the user's role is 'user'
  if (req.user.role_id === "user") {
    next();
  } else {
    return res.status(403).json({ success: false, message: "Access denied, insufficient permissions" });
  }
};
