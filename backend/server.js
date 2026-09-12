const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");
const businessRoutes = require("./routes/businessRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const authRoutes = require("./routes/authRoutes");
const app = express();

app.use(cors());

app.use(
  express.json({
    limit: "10mb",
  })
);

connectDB();

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Balaji Carpenter API is running",
  });
});

app.use("/api/services", serviceRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/business", businessRoutes);
app.use("/api/auth", authRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});