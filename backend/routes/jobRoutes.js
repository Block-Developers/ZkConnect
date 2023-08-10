const express = require("express");
const router = express.Router();
const JobPost = require("../models/jobpost");
const User = require("../models/user");
const JobApplication = require("../models/jobApplication");

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

// Apply for a job
router.post("/apply", verifyToken, async (req, res) => {
  try {
    // Get the job post and the logged-in user
    const jobPost = await JobPost.findById(req.body.jobId);
    const user = await User.findById(req.userId); // User ID from the token

    // Check if the user has already applied
    const existingApplication = await JobApplication.findOne({
      jobPost: jobPost._id,
      applicant: user._id,
    });

    if (existingApplication) {
      return res.status(400).json({
        success: false,
        message: "You have already applied for this job",
      });
    }

    // Create a new job application
    const jobApplication = new JobApplication({
      jobPost: jobPost._id,
      applicant: user._id,
    });
    user.jobApplications.push(jobApplication._id);
    await user.save();
    await jobApplication.save();

    // Update the job post's applicants array
    jobPost.applicants.push(user._id);
    await jobPost.save();

    res.status(201).json({ success: true, message: "Applied successfully" });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.get("/:jobId/applicants", verifyToken, async (req, res) => {
  try {
    const jobPost = await JobPost.findById(req.params.jobId).populate({
      path: "applicants",
      select: "username email", // Only select the fields you want
    });

    res.status(200).json({ success: true, applicants: jobPost.applicants });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

module.exports = router;
