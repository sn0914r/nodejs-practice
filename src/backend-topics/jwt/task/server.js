const express = require("express");
const cors = require("cors");
require("dotenv").config();

const router = require("./routes/router");
const globalErrorHandler = require("./controllers/globalErrorHandler.controller");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

/* =======================================================================
Router
======================================================================= */
app.use(router);


/* =======================================================================
Global Error Handler
======================================================================= */
app.use(globalErrorHandler);


app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
