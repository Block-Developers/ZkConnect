const User = require("../models/user");

// Fetch the logged-in user's profile
const getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (err) {
    res.status(500).json({ message: "Error fetching user profile", error: err.message });
  }
};

// Update the logged-in user's profile
const updateUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    const { username, email } = req.body;

    // Check if the username and email are provided
    if (!username || !email) {
      return res.status(400).json({ message: "Username and email are required" });
    }

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    ).select("-password");

    res.status(200).json({ message: "User profile updated successfully", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: "Error updating user profile", error: err.message });
  }
};

module.exports = { getUserProfile, updateUserProfile };
