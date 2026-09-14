const express = require("express");

const {
  getGalleryItems,
  addGalleryItem,
  updateGalleryItem,
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

router.put(
  "/:id",
  protectAdmin,
  updateGalleryItem
);

router.delete(
  "/:id",
  protectAdmin,
  deleteGalleryItem
);

module.exports = router;