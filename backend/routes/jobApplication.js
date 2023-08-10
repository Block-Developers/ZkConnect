const express = require("express");
const router = express.Router();
const JobApplication = require("../models/jobApplication");

// Route to create a new job application
router.post("/", async (req, res) => {
  try {
    const { jobPostId } = req.body; // Assuming you send the job post ID in the request body
    const applicantId = req.user.id; // Assuming you're using some form of authentication middleware

    const newJobApplication = new JobApplication({
      jobPost: jobPostId,
      applicant: applicantId,
    });

    await newJobApplication.save();

    res.status(201).json({ message: "Job application created successfully." });
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

// Route to get job applications for a specific job post
router.get("/:jobPostId", async (req, res) => {
  try {
    const jobPostId = req.params.jobPostId;

    const applications = await JobApplication.find({ jobPost: jobPostId })
      .populate("applicant")
      .exec();

    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ error: "An error occurred." });
  }
});

module.exports = router;
