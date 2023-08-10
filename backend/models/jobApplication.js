const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  jobPost: { type: mongoose.Schema.Types.ObjectId, ref: "JobPost" },
  applicant: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  applicationDate: { type: Date, default: Date.now },
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
