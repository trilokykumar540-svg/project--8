const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const Admin = require("../models/Admin");

const resetAdminPassword = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const email = "admin@balajicarpenter.com";
    const newPassword = "Admin@123";

    let admin = await Admin.findOne({
      email: email.toLowerCase(),
    });

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    if (!admin) {
      admin = await Admin.create({
        name: "Balaji Carpenter Admin",
        email,
        password: hashedPassword,
      });

      console.log("Admin created successfully.");
    } else {
      admin.password = hashedPassword;
      await admin.save();

      console.log("Admin password reset successfully.");
    }

    console.log("Email:", email);
    console.log("Password:", newPassword);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error(
      "Admin reset error:",
      error.message
    );

    await mongoose.connection.close();
    process.exit(1);
  }
};

resetAdminPassword();