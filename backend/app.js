const express = require("express");
const ErrorHandler = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express"); // Import Swagger
const swaggerJsDoc = require("swagger-jsdoc"); // Import Swagger JSDoc for configuration

const app = express();

// CORS configuration
app.use(cors({
  origin: ['https://front-end-proyek-3.vercel.app'],
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true, limit: "700mb" }));

// Test Route
app.use("/test", (req, res) => {
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
    },
    servers: [
      {
        url: "https://proyek-3-api.vercel.app", // Ganti dengan URL Vercel Anda
        description: "Production Server",
      },
    ],
  },
  apis: ["./controller/*.js"], // Pastikan path ini benar
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

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

module.exports = app;
