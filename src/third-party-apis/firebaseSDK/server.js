require("dotenv").config();
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./controllers/globalErrorHandler.controller");
const asyncErrorHandler = require("./utils/asyncErrorHandler");
const firestoreRoutes = require("./routes/firestore.crud.routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/firestore", asyncErrorHandler(firestoreRoutes));

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
