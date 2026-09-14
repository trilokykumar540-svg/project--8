const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

const protectAdmin = async (req, res, next) => {
  try {
    if (!process.env.JWT_SECRET) {
      console.error(
        "JWT_SECRET is missing from environment variables."
      );

      return res.status(500).json({
        success: false,
        message: "Server configuration error.",
      });
    }

    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      typeof authHeader !== "string" ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const token = authHeader
      .slice(7)
      .trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    if (!decoded.adminId) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    const admin = await Admin.findById(
      decoded.adminId
    ).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token.",
      });
    }

    req.admin = admin;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token.",
    });
  }
};

module.exports = {
  protectAdmin,
};