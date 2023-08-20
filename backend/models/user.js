const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { UserCounter, CompanyCounter } = require("./counter");

const userSchema = new mongoose.Schema({
  id: { type: Number, unique: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["user", "company"], default: "user" },
  isCompany: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date },
  registrationOTP: { type: String }, // Store the OTP generated during registration
  isVerified: { type: Boolean, default: false }, // Flag to indicate if the account is verified
  companyName: {
    type: String,
    validate: {
      validator: function (value) {
        // Only require companyName if the role is "company"
        if (this.role === "company") {
          return value && value.trim().length > 0;
        }
        return true; // Return true for non-company roles
      },
      message: "Company name is required for company role.",
    },
  },
  jobApplications: [
    { type: mongoose.Schema.Types.ObjectId, ref: "JobApplication" },
  ],

  userregister: [
    {
      firstName: { type: String },
      lastName: { type: String },
      location: { type: String },
      contactNumber: { type: String },
      resume: { type: String },
      profileBio: { type: String },
      selectedButton: { type: String },
      selectedSkills: { type: String },
    },
  ],
  companyregister: [
    {
      CompanyNumber: {
        type: String,
        validate: {
          validator: function (value) {
            // Validate CompanyNumber based on role
            if (this.role === "company") {
              return value && value.trim().length > 0;
            }
            return true; // Return true for non-company roles
          },
          message: "Company number is required for company role.",
        },
      },
      CompanyLinkedIn: {
        type: String,
        validate: {
          validator: function (value) {
            // Validate CompanyNumber based on role
            if (this.role === "company") {
              return value && value.trim().length > 0;
            }
            return true; // Return true for non-company roles
          },
          message: "Company number is required for company role.",
        },
      },
      CompanyLocation: {
        type: String,
        validate: {
          validator: function (value) {
            // Validate CompanyNumber based on role
            if (this.role === "company") {
              return value && value.trim().length > 0;
            }
            return true; // Return true for non-company roles
          },
          message: "Company number is required for company role.",
        },
      },
      Employees: {
        type: String,
        validate: {
          validator: function (value) {
            // Validate CompanyNumber based on role
            if (this.role === "company") {
              return value && value.trim().length > 0;
            }
            return true; // Return true for non-company roles
          },
          message: "Company number is required for company role.",
        },
      },
      StartingYear: {
        type: String,
        validate: {
          validator: function (value) {
            // Validate CompanyNumber based on role
            if (this.role === "company") {
              return value && value.trim().length > 0;
            }
            return true; // Return true for non-company roles
          },
          message: "Company number is required for company role.",
        },
      },
      CompanyProfile: {
        type: String,
        validate: {
          validator: function (value) {
            // Validate CompanyNumber based on role
            if (this.role === "company") {
              return value && value.trim().length > 0;
            }
            return true; // Return true for non-company roles
          },
          message: "Company number is required for company role.",
        },
      },
      Logo: {
        type: String,
        validate: {
          validator: function (value) {
            // Validate CompanyNumber based on role
            if (this.role === "company") {
              return value && value.trim().length > 0;
            }
            return true; // Return true for non-company roles
          },
          message: "Company number is required for company role.",
        },
      },
    },
  ],
});

// Pre-save middleware to generate the 'id' field based on the counter collection
userSchema.pre("save", async function (next) {
  try {
    if (!this.id) {
      let counter;
      if (this.isCompany) {
        counter = await CompanyCounter.findByIdAndUpdate(
          { _id: "companySeq" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
      } else {
        counter = await UserCounter.findByIdAndUpdate(
          { _id: "userSeq" },
          { $inc: { seq: 1 } },
          { new: true, upsert: true }
        );
      }

      this.id = counter.seq;
    }

    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
