const Gallery = require("../models/Gallery");
const cloudinary = require("../config/cloudinary");

const getGalleryItems = async (req, res) => {
  try {
    const items = await Gallery.find().sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: items.length,
      items,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch gallery items.",
      error: error.message,
    });
  }
};

const addGalleryItem = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      price,
      imageBase64,
    } = req.body;

    if (!title || !category || !imageBase64) {
      return res.status(400).json({
        success: false,
        message:
          "Title, category and image are required.",
      });
    }

    const uploadResult =
      await cloudinary.uploader.upload(
        imageBase64,
        {
          folder: "balaji-carpenter/gallery",
        }
      );

    const item = await Gallery.create({
      title,
      category,
      description: description || "",
      price: price || "",
      imageUrl: uploadResult.secure_url,
      imagePublicId: uploadResult.public_id,
    });

    res.status(201).json({
      success: true,
      message: "Gallery item added successfully.",
      item,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add gallery item.",
      error: error.message,
    });
  }
};

const deleteGalleryItem = async (req, res) => {
  try {
    const item = await Gallery.findById(
      req.params.id
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Gallery item not found.",
      });
    }

    await cloudinary.uploader.destroy(
      item.imagePublicId
    );

    await item.deleteOne();

    res.status(200).json({
      success: true,
      message: "Gallery item deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete gallery item.",
      error: error.message,
    });
  }
};

module.exports = {
  getGalleryItems,
  addGalleryItem,
  deleteGalleryItem,
};