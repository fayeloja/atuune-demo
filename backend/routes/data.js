const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");
const verifyToken = require("../middleware/verifyToken");

// Write data to Realtime Database DB (protected route)

router.post("/write", verifyToken, async (req, res) => {
  const { key, value } = req.body;
  const uid = req.user.uid;

  if (!key || value === undefined) {
    return res.status(400).json({ error: "Key and value are required" });
  }

  try {
    await admin.database().ref(`users/${uid}/data/${key}`).set(value);

    res.status(200).json({
      message: "Data written successfully",
      path: `users/${uid}/data/${key}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to write data", details: error.message });
  }
});

// Read data from Realtime Database (protected route)
router.get("/read", verifyToken, async (req, res) => {
  const uid = req.user.uid;

  try {
    const snapshot = await admin
      .database()
      .ref(`users/${uid}/data`)
      .once("value");

    res.json({ data: snapshot.val() });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to read data", details: error.message });
  }
});

module.exports = router;
