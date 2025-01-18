const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const app = express();

// CORS configuration
app.use(
    cors({
      origin: [
        "https://front-end-proyek-3.vercel.app", // URL frontend Anda
        "https://proyek-3-api.vercel.app", // URL endpoint API yang perlu diakses
        "http://localhost:8000",
      ],
      credentials: true, // Mengizinkan cookie dan header autentikasi
      methods: ["GET", "POST", "PUT", "DELETE"], // Metode HTTP yang diizinkan
      allowedHeaders: ["Content-Type", "Authorization"], // Header yang diizinkan
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "700mb" }));

// Test Route
app.get("/test", (req, res) => {
  res.send("Hello world!");
});

// Swagger Configuration
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Express API Documentation",
      version: "1.0.0",
      description: "API documentation for the Express.js application",
      contact: {
        name: "Developer Name",
        email: "developer@example.com",
      },
    },
    servers: [
      {
        url: "http://localhost:8000", // Update URL sesuai dengan lingkungan lokal Anda
        description: "Local Server",
      },
      {
        url: "https://proyek-3-api.vercel.app", // Update URL untuk environment production
        description: "Production Server",
      },
    ],
  },
  apis: ["./controller/*.js"], // Path ke file controller untuk dokumentasi API
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

// Swagger Middleware
app.use("/api-docs", (req, res, next) => {
  console.log("Swagger UI requested:", req.url); // Debug log
  next();
}, swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Environment Configuration
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "config/.env",
  });
}

// Import Routes
const user = require("./controller/user");
const shop = require("./controller/shop");
const product = require("./controller/product");
const event = require("./controller/event");
const coupon = require("./controller/coupounCode");
const payment = require("./controller/payment");
const order = require("./controller/order");
const conversation = require("./controller/conversation");
const message = require("./controller/message");
const withdraw = require("./controller/withdraw");

app.use("/api/v2/user", user);
app.use("/api/v2/conversation", conversation);
app.use("/api/v2/message", message);
app.use("/api/v2/order", order);
app.use("/api/v2/shop", shop);
app.use("/api/v2/product", product);
app.use("/api/v2/event", event);
app.use("/api/v2/coupon", coupon);
app.use("/api/v2/payment", payment);
app.use("/api/v2/withdraw", withdraw);

// Error Handling Middleware
app.use(ErrorHandler);

// Serve Frontend in Production
if (process.env.NODE_ENV === "PRODUCTION") {
  const path = require("path");
  app.use(express.static(path.join(__dirname, "../frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/build", "index.html"));
  });
}

module.exports = app;
