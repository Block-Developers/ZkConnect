// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  try {
    const { role, email, username, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if a user with the same email already exists
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) {
      return res
        .status(409)
        .json({ message: "A user with the same email already exists." });
    }

    // Define the user role based on the provided data
    let userRole;
    let isCompany = false; // Set the default value for isCompany
    let companyName = false;

    if (role === "company") {
      userRole = "company";
      isCompany = true; // Set isCompany to true for company registrations
      companyName = req.body.companyName;
    } else {
      userRole = "user";
    }

    // Create the user
    const user = new User({
      role: userRole,
      isCompany: isCompany, // Set the isCompany field based on the role
      companyName: companyName,
      email,
      username,
      password: hashedPassword,
      createdAt: new Date(),
      lastLogin: null, // Initially, there is no last login, so it is set to null
    });

    await user.save();

    res.status(201).json({ message: "User created successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    // Check if the user exists
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    // Generate a JWT token
    const token = jwt.sign({ userId: user._id }, "carbonrelay", {
      expiresIn: "1h", // Token will expire in 1 hour (adjust as needed)
    });

    // Update the user's lastLogin field
    user.lastLogin = new Date();
    await user.save();

    // Send the token and user data in the response
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: "Error during login", error: err.message });
  }
});

router.post("/registerUser", verifyToken, async (req, res) => {
  try {
    const {
      selectedButton,
      selectedSkills,
      firstName,
      lastName,
      email,
      location,
      contactNumber,
      resume,
      profileBio,
    } = req.body;

    // Find the user by their ID (assuming req.userId holds the ID)
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push the user registration data into the userregister array
    user.userregister.push({
      selectedButton,
      selectedSkills,
      firstName,
      lastName,
      email,
      location,
      contactNumber,
      resume,
      profileBio,
    });

    // Save the updated user to the database
    await user.save();

    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering user", error: err.message });
  }
});

router.post("/registerCompany", verifyToken, async (req, res) => {
  try {
    const {
      CompanyNumber,
      CompanyLinkedIn,
      CompanyLocation,
      Employees,
      StartingYear,
      CompanyProfile,
      Logo,
    } = req.body;

    // Find the user by their ID (assuming req.userId holds the ID)
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Push the company registration data into the companyregister array
    user.companyregister.push({
      CompanyNumber,
      CompanyLinkedIn,
      CompanyLocation,
      Employees,
      StartingYear,
      CompanyProfile,
      Logo,
    });

    // Save the updated user to the database
    await user.save();

    res.status(201).json({ message: "Company registered successfully", user });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error registering company", error: err.message });
  }
});

// Protected route example
router.get("/protected", (req, res) => {
  // Check if the user is authenticated (token present and valid)
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  jwt.verify(token, "carbonrelay", (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" });
    }

    // Do something if the token is valid
    res.json({ message: "Protected route accessed successfully" });
  });
});

const {
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

// Fetch user profile
router.get("/profile", verifyToken, getUserProfile);

// Update user profile
router.put("/profile", verifyToken, updateUserProfile);

module.exports = router;
