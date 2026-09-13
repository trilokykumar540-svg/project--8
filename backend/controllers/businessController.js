const BusinessInfo = require("../models/BusinessInfo");

const getBusinessInfo = async (req, res) => {
  try {
    let business = await BusinessInfo.findOne();

    if (!business) {
      business = await BusinessInfo.create({
        businessName: "WoodMagic",
        phone: "9931697178",
        whatsapp: "9931697178",
        address: "Sonpurwa",
        city: "",
        state: "",
        mapLink: "",
      });
    }

    res.status(200).json({
      success: true,
      business,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch business information.",
      error: error.message,
    });
  }
};

const updateBusinessInfo = async (req, res) => {
  try {
    const {
      businessName,
      phone,
      whatsapp,
      address,
      city,
      state,
      mapLink,
    } = req.body;

    if (!phone || !whatsapp || !address) {
      return res.status(400).json({
        success: false,
        message:
          "Phone, WhatsApp and address are required.",
      });
    }

    let business = await BusinessInfo.findOne();

    if (!business) {
      business = await BusinessInfo.create({
        businessName,
        phone,
        whatsapp,
        address,
        city,
        state,
        mapLink,
      });
    } else {
      business.businessName =
        businessName || business.businessName;

      business.phone = phone;
      business.whatsapp = whatsapp;
      business.address = address;
      business.city = city || "";
      business.state = state || "";
      business.mapLink = mapLink || "";

      await business.save();
    }

    res.status(200).json({
      success: true,
      message: "Business information updated.",
      business,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update business information.",
      error: error.message,
    });
  }
};

module.exports = {
  getBusinessInfo,
  updateBusinessInfo,
};