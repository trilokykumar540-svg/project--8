const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

dotenv.config();

const connectDB = require("./config/db");

const businessRoutes = require("./routes/businessRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const enquiryRoutes = require("./routes/enquiryRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();

/* =========================================
   BASIC SECURITY
========================================= */

app.disable("x-powered-by");

app.use(
  helmet({
    crossOriginResourcePolicy: {
      policy: "cross-origin",
    },
  })
);

/* =========================================
   CORS
========================================= */

const allowedOrigins = [
  "http://localhost:5173",
  "https://woodmagic.in",
  "https://www.woodmagic.in",
];

if (process.env.FRONTEND_URL) {
  allowedOrigins.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without Origin
      // Example: server-to-server / Postman
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Not allowed by CORS")
      );
    },

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* =========================================
   BODY LIMIT
========================================= */

app.use(
  express.json({
    limit: "10mb",
  })
);

/* =========================================
   GENERAL API RATE LIMIT
========================================= */

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 300,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many requests. Please try again later.",
  },
});

app.use("/api", apiLimiter);

/* =========================================
   LOGIN RATE LIMIT
========================================= */

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,

  max: 10,

  standardHeaders: true,
  legacyHeaders: false,

  message: {
    success: false,
    message:
      "Too many login attempts. Please try again later.",
  },
});

/* =========================================
   DATABASE
========================================= */

connectDB();

/* =========================================
   HOME
========================================= */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "WoodMagic API is running",
  });
});

/* =========================================
   ROUTES
========================================= */

app.use(
  "/api/auth",
  loginLimiter,
  authRoutes
);

app.use(
  "/api/services",
  serviceRoutes
);

app.use(
  "/api/enquiries",
  enquiryRoutes
);

app.use(
  "/api/gallery",
  galleryRoutes
);

app.use(
  "/api/business",
  businessRoutes
);

/* =========================================
   404
========================================= */

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "API route not found.",
  });
});

/* =========================================
   GLOBAL ERROR HANDLER
========================================= */

app.use((err, req, res, next) => {
  console.error(err.message);

  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      success: false,
      message: "Origin not allowed.",
    });
  }

  res.status(500).json({
    success: false,
    message: "Internal server error.",
  });
});

/* =========================================
   SERVER
========================================= */

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `WoodMagic server running on port ${PORT}`
  );
});