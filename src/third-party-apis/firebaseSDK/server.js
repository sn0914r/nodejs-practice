require("dotenv").config();
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./utils/globalErrorHandler.controller");
const asyncErrorHandler = require("./utils/asyncErrorHandler");
const firestoreRoutes = require("./firestore/routes/firestore.crud.routes");
const authRouter = require("./routes/authentication.routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use("/firestore", asyncErrorHandler(firestoreRoutes));
app.use("/auth", authRouter);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
