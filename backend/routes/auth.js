// routes/auth.js
const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { verifyToken } = require("../middleware/auth");
const nodemailer = require("nodemailer");
const randomstring = require("randomstring");

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
    let isVerified = false;
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
      isVerified: isVerified,
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

router.post("/registerotp", verifyToken, async (req, res) => {
  try {
    // Find the user based on the token
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate OTP
    const otp = randomstring.generate({
      length: 6,
      charset: "numeric",
    });

    // Send OTP via email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zkconnectt@gmail.com", // Your Gmail email address
        pass: "bndbswpvujhzthge", // Your Gmail password or app password
      },
    });

    const mailOptions = {
      from: "zkconnectt@gmail.com",
      to: user.email,
      subject: "OTP for ZKConnect Account Verification",
      text: `Hi there!\n\nThanks for using ZKConnect. Your OTP for account verification is: ${otp}\n\nWe're excited to have you on board and look forward to your valuable registration.\n\nBest regards,\nThe ZKConnect Team`,
    };

    await transporter.sendMail(mailOptions);

    // Store OTP in user document
    user.registrationOTP = otp;
    await user.save();

    res
      .status(200)
      .json({ message: "Registration successful. OTP sent to email." });
  } catch (error) {
    console.error("Error in /registerotp:", error);
    res.status(500).json({ error: "An error occurred." });
  }
});

router.post("/verify", verifyToken, async (req, res) => {
  try {
    // Find user by email
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { otp } = req.body;

    if (user.registrationOTP !== otp) {
      return res.status(400).json({ message: "Invalid OTP." });
    }

    // Update isVerified status
    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: "Account verified successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
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
