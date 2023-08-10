// app.js (or index.js)
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
var cors = require("cors");
const jobPostRoutes = require("./routes/jobRoutes"); // Import job post routes
const jobApplicationRoutes = require("./routes/jobApplication");

const app = express();
app.use(cors()); // Use this after the variable declaration

// Connected to your MongoDB database
const dbURI = "mongodb+srv://admin:admin@cluster0.rxnpu.mongodb.net/ZKConnt";
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

// Added middleware to parse incoming JSON data
app.use(express.json());

// Routes for login, signup, and protected routes will go here
// Import and use the authentication routes
const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);

app.use("/jobPosts", jobPostRoutes);

app.use("/jobApplications", jobApplicationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "🦄🌈✨👋🌎ZK-Connect Backend API🌏✨🌈🦄",
  });
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

module.exports = app;
