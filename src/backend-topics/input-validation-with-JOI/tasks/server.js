const express = require("express");
require("dotenv").config();
const cors = require("cors");

const { globalErrorHandler } = require("./controllers");
const router = require("./router");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Product Router
app.use(router);

// Global Errror Handler
app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("Server is runnning at", PORT);
});
