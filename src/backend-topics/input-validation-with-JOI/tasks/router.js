const express = require("express");
const router = express.Router();

const {
  validationMiddleware,
  productSchema,
  productSchemaPATCH,
  productsSchema,
} = require("./validation");
const {
  addProduct,
  getProducts,
  getProduct,
  patchProduct,
  bulkAddproducts,
} = require("./controllers");

// Task 1 End point
router.post("/product", validationMiddleware(productSchema), addProduct);

// Task 2 End Point
router.patch(
  "/product/:id",
  validationMiddleware(productSchemaPATCH),
  patchProduct
);

// Task3 End point
router.post(
  "/products/bulk",
  validationMiddleware(productsSchema),
  bulkAddproducts
);


router.get("/products", getProducts);
router.get("/product/:id", getProduct);

module.exports = router;
