const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountKey.json");

dotenv.config();

//Init Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.FIREBASE_DATABASE_URL,
});

const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/data", require("./routes/data"));

//Health Check Endpoint
app.get("/", (req, res) => {
  res
    .status(200)
    .json({ status: "ATUUNE backend is live", timestamp: new Date() });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
