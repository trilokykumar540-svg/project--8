const express = require("express");

const {
  getGalleryItems,
  addGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");

const {
  protectAdmin,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getGalleryItems);

router.post(
  "/",
  protectAdmin,
  addGalleryItem
);

router.delete(
  "/:id",
  protectAdmin,
  deleteGalleryItem
);

module.exports = router;