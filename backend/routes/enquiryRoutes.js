const express = require("express");

const {
  getEnquiries,
  createEnquiry,
  updateEnquiryStatus,
  deleteEnquiry,
} = require("../controllers/enquiryController");

const {
  protectAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", createEnquiry);

router.get(
  "/",
  protectAdmin,
  getEnquiries
);

router.patch(
  "/:id/status",
  protectAdmin,
  updateEnquiryStatus
);

router.delete(
  "/:id",
  protectAdmin,
  deleteEnquiry
);

module.exports = router;