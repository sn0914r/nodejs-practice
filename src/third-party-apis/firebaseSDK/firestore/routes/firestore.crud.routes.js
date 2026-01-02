const express = require("express");
const router = express.Router();
const asyncErrorHandler = require("../../utils/asyncErrorHandler");

// CREATE IMPORTS
const {
  addResource,
  setResoure,
} = require("../controllers/firestore/create.controllers");

// READ IMPORTS
const {
  getSingleResource,
  getAllResources,
} = require("../controllers/firestore/read.controller");

// UPDATE IMPORTS
const {
  updateResource,
} = require("../controllers/firestore/update.controller");

// DELETE IMPORTS
const {
  deleteResource,
} = require("../controllers/firestore/delete.controllers");

// ======================================================================================================

// CREATE - add & set methods
router.post("/add", asyncErrorHandler(addResource));
router.post("/set", asyncErrorHandler(setResoure));

// READ - get
router.get("/get/:id", asyncErrorHandler(getSingleResource));
router.get("/get", asyncErrorHandler(getAllResources));

// UPDATE
router.patch("/update/:id", asyncErrorHandler(updateResource));

// DELETE
router.delete("/delete/:id", asyncErrorHandler(deleteResource));

// WILDCARD ROUTE
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
});
module.exports = router;
