const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    price: {
      type: String,
      default: "",
      trim: true,
    },

    imageUrl: {
      type: String,
      required: true,
    },

    imagePublicId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Gallery", gallerySchema);