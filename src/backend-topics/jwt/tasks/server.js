const express = require("express");
const router = require("./task3");
require("dotenv").config();
const cors = require("cors");


const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors())
app.use(express.json())

app.use(router);

app.use((err, req, res, next) => {
  let statusCode = res.statusCode || 500;
  let msg = err.message || "Internal Server Error";

  res.status(statusCode).json({
    isSuccess: false,
    error: msg,
  });
});

app.listen(PORT, () => {
  console.log("Server is running at", PORT);
});
