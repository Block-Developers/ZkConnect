const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  roleName: String,
  modeOfWork: String,
  duration: String,
  selectedSkills: [String],
  stipendValue: String,
  aboutRole: String,
  numberOfOpening: String,
  company: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  applicants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const JobPost = mongoose.model("JobPost", jobPostSchema);

module.exports = JobPost;
