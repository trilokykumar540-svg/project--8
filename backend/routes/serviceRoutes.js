const express = require("express");

const {
  getServices,
  addService,
  updateService,
  deleteService,
} = require("../controllers/serviceController");

const {
  protectAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getServices);

router.post(
  "/",
  protectAdmin,
  addService
);

router.put(
  "/:id",
  protectAdmin,
  updateService
);

router.delete(
  "/:id",
  protectAdmin,
  deleteService
);

module.exports = router;