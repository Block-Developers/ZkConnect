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
    const jobId = req.body.jobId;
    const userId = req.userId;

    // Get the job post and the logged-in user
    const jobPost = await JobPost.findById(jobId);
    const user = await User.findById(userId);

    if (!jobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

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

    user.jobApplications.push(jobApplication);
    await user.save();
    await jobApplication.save();

    // Update the job post's applicants array
    jobPost.applicants.push(user);
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

router.get("/:jobId/applicants-details", verifyToken, async (req, res) => {
  try {
    const jobId = req.params.jobId;

    const jobPost = await JobPost.findById(jobId)
      .populate({
        path: "applicants",
        model: "User", // Specify the model to populate from
      })
      .exec();

    if (!jobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    // Additional role-based logic here (e.g., check if the requester is a recruiter)

    res.status(200).json({ success: true, applicants: jobPost.applicants });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

router.put(
  "/select-applicant/:applicationId",
  verifyToken,
  async (req, res) => {
    try {
      const applicationId = req.params.applicationId;
      const { status } = req.query; // Retrieve the status from the query parameter

      const application = await JobApplication.findById(applicationId);

      if (!application) {
        return res.status(404).json({
          success: false,
          message: "Application not found",
        });
      }

      // Additional role-based logic here (e.g., check if the requester is a recruiter)

      // Update the status based on the provided status query parameter
      application.status = status;
      await application.save(); // This line updates the status

      res
        .status(200)
        .json({ success: true, message: "Status updated successfully" });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred",
        error: error.message,
      });
    }
  }
);

// Add this route to your existing code
router.get("/my-posts", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    // Find the company using the userId
    const company = await User.findById(userId);

    if (!company) {
      return res.status(404).json({
        success: false,
        message: "Company not found",
      });
    }

    // Find all job posts created by the company
    const jobPosts = await JobPost.find({ company: company._id });

    res.status(200).json({ success: true, jobPosts });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

// Get the applications for the logged-in user
router.get("/my-applications", verifyToken, async (req, res) => {
  try {
    const userId = req.userId;

    const userApplications = await User.findById(userId)
      .populate({
        path: "jobApplications.jobPost",
        populate: { path: "company" },
      })
      .exec();

    if (!userApplications) {
      return res.status(404).json({
        success: false,
        message: "User applications not found",
      });
    }

    res
      .status(200)
      .json({ success: true, applications: userApplications.jobApplications });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

// Get a specific job post by ID with associated company details
router.get("/:jobId", async (req, res) => {
  try {
    const jobId = req.params.jobId;
    const jobPost = await JobPost.findById(jobId).populate("company");

    if (!jobPost) {
      return res.status(404).json({
        success: false,
        message: "Job post not found",
      });
    }

    res.status(200).json({ success: true, jobPost });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred",
      error: error.message,
    });
  }
});

// Other routes...

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
