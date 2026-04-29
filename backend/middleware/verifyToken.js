const admin = require("firebase-admin");

// Middleware to verify Firebase ID Token
const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken; // Attach decoded token to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(401).json({ error: "Unauthorized: Invalid token" });
  }
};

module.exports = verifyToken;
