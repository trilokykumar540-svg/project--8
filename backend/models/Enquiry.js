const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    service: {
      type: String,
      required: true,
      trim: true,
    },
    requirement: {
      type: String,
      required: true,
      trim: true,
    },
    preferredDate: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Confirmed", "Completed"],
      default: "New",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Enquiry", enquirySchema);