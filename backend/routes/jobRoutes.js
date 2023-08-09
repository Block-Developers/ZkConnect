const express = require("express");
const router = express.Router();
const JobPost = require("../models/jobpost");
const User = require("../models/user");

const { verifyToken } = require("../middleware/auth");
// Create a new job post
router.post("/create", verifyToken, async (req, res) => {
  try {
    // Get company details
    const company = await User.findById(req.body.companyId); // Assuming companyId is sent in the request body

    // Create the job post
    const jobPost = new JobPost({
      roleName: req.body.roleName,
      modeOfWork: req.body.modeOfWork,
      duration: req.body.duration,
      selectedSkills: req.body.selectedSkills,
      stipendValue: req.body.stipendValue,
      aboutRole: req.body.aboutRole,
      numberOfOpening: req.body.numberOfOpening,
      company: company._id,
    });

    await jobPost.save();

    res
      .status(201)
      .json({ success: true, message: "Job post created successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

// Get all job posts with associated company details
router.get("/all", async (req, res) => {
  try {
    const jobPosts = await JobPost.find().populate("company");
    res.status(200).json({ success: true, jobPosts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

module.exports = router;
