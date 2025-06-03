const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../keys/keys"); // Ensure this path is correct
const User = require("../models/user"); // Ensure this path is correct

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  console.log("Authorization Header (requireAdmin):", authorization); // Log the header for debugging

  if (!authorization) {
    return res.status(401).json({ error: "You must be logged in to access this resource." });
  }

  const token = authorization.replace("Bearer ", "");

  jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      console.error("JWT Verification Error (requireAdmin):", err); // Log the JWT error
      return res.status(401).json({ error: "Invalid token or session expired." });
    }

    const { id } = payload;
    User.findById(id)
      .then((userdata) => {
        if (!userdata) {
          return res.status(401).json({ error: "User not found." });
        }

        // Check if the user's role is 'Admin'
        if (userdata.role !== 'Admin') {
          console.warn(`Access denied: User ${userdata.email} (Role: ${userdata.role}) attempted admin action.`);
          return res.status(403).json({ error: "Access denied. Only administrators can perform this action." });
        }

        req.user = userdata; // Attach user data to the request object
        next(); // Proceed to the next middleware/route handler
      })
      .catch((userFindErr) => {
        console.error("Error finding user by ID (requireAdmin):", userFindErr);
        res.status(500).json({ error: "Internal server error during user lookup." });
      });
  });
};
