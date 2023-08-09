// models/counter.js
const mongoose = require("mongoose");

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  seq: { type: Number, default: 0 },
});

const UserCounter = mongoose.model("UserCounter", counterSchema);
const CompanyCounter = mongoose.model("CompanyCounter", counterSchema);

module.exports = { UserCounter, CompanyCounter };
