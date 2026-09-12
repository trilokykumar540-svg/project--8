const express = require("express");

const {
  getBusinessInfo,
  updateBusinessInfo,
} = require("../controllers/businessController");

const {
  protectAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getBusinessInfo);

router.put(
  "/",
  protectAdmin,
  updateBusinessInfo
);

module.exports = router;