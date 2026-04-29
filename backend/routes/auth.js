const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

// Register a new user

router.post("/register", async (req, res) => {
  const { email, password, displayName } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
    const userRecord = await admin.auth().createUser({
      email,
      password,
      displayName: displayName || email.split("@")[0], // Use email prefix as display name if not provided
    });

    return res.status(201).json({
      message: "User registered successfully",
      uid: userRecord.uid,
      email: userRecord.email,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get user profile (protected route)
const verifyToken = require("../middleware/verifyToken");

router.get("/profile", verifyToken, async (req, res) => {
  try {
    const user = await admin.auth().getUser(req.user.uid);

    res.json({
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
