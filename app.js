require("dotenv").config();
const express = require("express");
const path = require("path");
const connectDB = require("./config/database");
const chatController = require("./controllers/chatController");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Middleware to parse JSON
app.use(express.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// API Routes
app.post("/ask", chatController.ask);
app.get("/history", chatController.history);

// Fallback route to serve index.html for all other GET requests
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
