const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

dotenv.config();

const Admin = require("../models/Admin");

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected.");

    const email = "admin@balajicarpenter.com";
    const password = "Admin@123";

    const existingAdmin = await Admin.findOne({
      email,
    });

    if (existingAdmin) {
      console.log("Admin already exists.");
      await mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    await Admin.create({
      name: "WoodMagic Admin",
      email,
      password: hashedPassword,
    });

    console.log("Admin created successfully.");
    console.log(`Email: ${email}`);

    await mongoose.connection.close();
  } catch (error) {
    console.error(
      "Admin creation error:",
      error.message
    );

    await mongoose.connection.close();
  }
};

createAdmin();