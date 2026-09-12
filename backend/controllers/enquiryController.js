const Enquiry = require("../models/Enquiry");

const getEnquiries = async (req, res) => {
  try {
    const enquiries = await Enquiry.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: enquiries.length,
      enquiries,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch enquiries.",
      error: error.message,
    });
  }
};

const createEnquiry = async (req, res) => {
  try {
    const {
      name,
      phone,
      location,
      service,
      requirement,
      preferredDate,
    } = req.body;

    if (!name || !phone || !location || !service || !requirement) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields.",
      });
    }

    const enquiry = await Enquiry.create({
      name,
      phone,
      location,
      service,
      requirement,
      preferredDate: preferredDate || "",
    });

    res.status(201).json({
      success: true,
      message: "Enquiry submitted successfully.",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit enquiry.",
      error: error.message,
    });
  }
};

const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "New",
      "Contacted",
      "Confirmed",
      "Completed",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid enquiry status.",
      });
    }

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    enquiry.status = status;

    await enquiry.save();

    res.status(200).json({
      success: true,
      message: "Enquiry status updated.",
      enquiry,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update enquiry status.",
      error: error.message,
    });
  }
};

const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({
        success: false,
        message: "Enquiry not found.",
      });
    }

    await enquiry.deleteOne();

    res.status(200).json({
      success: true,
      message: "Enquiry deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete enquiry.",
      error: error.message,
    });
  }
};

module.exports = {
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
};