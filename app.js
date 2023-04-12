const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const user = require("./routes/route");

const errorMiddleware = require("./middleware/error");

// Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({ path: "config/config.env" });
}

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// Route Imports

app.use("/api/v1", user);

// Middleware for Errors
app.use(errorMiddleware);

module.exports = app;
