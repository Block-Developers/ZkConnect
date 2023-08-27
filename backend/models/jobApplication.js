const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
  jobPost: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "JobPost",
    required: true,
  },
  applicant: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  status: {
    type: String,
    enum: ["pending", "selected", "rejected"],
    default: "pending",
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose pre middleware to update the numberOfApplicants field
jobApplicationSchema.pre("save", async function (next) {
  try {
    // Update job application details in the user document
    const User = mongoose.model("User");
    const userId = this.applicant;

    await User.updateOne(
      { _id: userId },
      {
        $push: {
          jobApplications: {
            jobPost: this.jobPost,
            status: this.status,
            appliedDate: this.appliedDate,
          },
        },
      }
    );

    next();
  } catch (error) {
    next(error);
  }
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
