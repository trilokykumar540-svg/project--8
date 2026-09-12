const Service = require("../models/Service");

const getServices = async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: services.length,
      services,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch services.",
      error: error.message,
    });
  }
};

const addService = async (req, res) => {
  try {
    const { title, description, price } = req.body;

    if (!title || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "Title, description and price are required.",
      });
    }

    const service = await Service.create({
      title,
      description,
      price,
    });

    res.status(201).json({
      success: true,
      message: "Service added successfully.",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to add service.",
      error: error.message,
    });
  }
};

const updateService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    const { title, description, price } = req.body;

    service.title = title ?? service.title;
    service.description = description ?? service.description;
    service.price = price ?? service.price;

    await service.save();

    res.status(200).json({
      success: true,
      message: "Service updated successfully.",
      service,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update service.",
      error: error.message,
    });
  }
};

const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: "Service not found.",
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: "Service deleted successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete service.",
      error: error.message,
    });
  }
};

module.exports = {
  getServices,
  addService,
  updateService,
  deleteService,
};