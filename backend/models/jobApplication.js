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
    enum: ["pending", "selected"],
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
    const User = mongoose.model("User");
    const userId = this.applicant;
    const role = await User.findById(userId, "role").exec();

    const registrationField =
      role === "user" ? "userregister" : "companyregister";
    await User.updateOne(
      { _id: userId },
      { $inc: { [`${registrationField}.numberOfApplicants`]: 1 } }
    );

    next();
  } catch (error) {
    next(error);
  }
});

const JobApplication = mongoose.model("JobApplication", jobApplicationSchema);

module.exports = JobApplication;
