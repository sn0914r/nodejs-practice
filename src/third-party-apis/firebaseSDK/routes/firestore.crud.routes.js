const express = require("express");
const router = express.Router();

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
router.post("/add", addResource);
router.post("/set", setResoure);

// READ - get
router.get("/get/:id", getSingleResource);
router.get("/get", getAllResources);

// UPDATE
router.patch("/update/:id", updateResource);

// DELETE
router.delete("/delete/:id", deleteResource);

// WILDCARD ROUTE
router.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "route not found",
  });
});
module.exports = router;
