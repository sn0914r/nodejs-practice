require("dotenv").config();
const express = require("express");
const cors = require("cors");
const globalErrorHandler = require("./utils/globalErrorHandler.controller");
const asyncErrorHandler = require("./utils/asyncErrorHandler");
const firestoreRoutes = require("./firestore/routes/firestore.crud.routes");
const authRoutes = require("./auth/server/routers/auth.routes");

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
app.use("/firestore", firestoreRoutes);
app.use("/auth", authRoutes);

app.use(globalErrorHandler);

app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
