const db = require("./db");

/* =============================================================================================================================
GLOBAL ERROR HANDLER
============================================================================================================================= */
const globalErrorHandler = (error, req, res, next) => {
  let statusCode = res.statusCode || 500;
  let msg = error.message || "Internal Server Error";

  res.status(statusCode).json({
    isSuccess: false,
    error: msg,
  });
};

/* =============================================================================================================================
ADDS A NEW PRODUCT
============================================================================================================================= */
const addProduct = (req, res, next) => {
  try {
    let id = parseInt(Math.random() * 1000);
    let data = {
      id,
      ...req.validatedData,
      createdAt: new Date(),
    };

    db.push(data);

    res.status(200).json({
      isSuccess: true,
      data,
    });
  } catch (error) {
    next(error);
  }
};

/* =============================================================================================================================
GET ALL PRODUCTS
============================================================================================================================= */
const getProducts = (req, res) => {
  res.status(200).json({
    isSuccess: true,
    data: db,
  });
};

/* =============================================================================================================================
GET SINGLE PRODUCT BY ID
============================================================================================================================= */
const getProduct = (req, res) => {
  let id = req.params.id;

  if (!id) {
    res.statusCode = 400;
    throw new Error("Product id is required");
  }

  let product = db.find((product) => product.id == id);

  if (!product) {
    res.statusCode = 404;
    throw new Error("Product not found");
  }

  res.status(200).json({
    isSuccess: true,
    data: product,
  });
};

/* =============================================================================================================================
UPDATE SINGLE PRODUCT BY ID
============================================================================================================================= */
const patchProduct = (req, res) => {
  let id = req.params.id;

  if (!id) {
    res.statusCode = 400;
    throw new Error("Product id is required");
  }

  let product = db.find((product) => product.id == id);

  if (!product) {
    res.statusCode = 404;
    throw new Error("Product not found");
  }

  Object.assign(product, req.validatedData);

  res.status(200).json({
    isSuccess: true,
    data: product,
  });
};

/* =============================================================================================================================
BULK ADD PRODUCTS
============================================================================================================================= */
const bulkAddproducts = (req, res, next) => {
  try {
    let data = req.validatedData;
    let newproducts = data.map((product) => {
      product.id = parseInt(Math.random() * 1000);
      product.createdAt = new Date();
      return product;
    });

    db.push(...newproducts);

    res.status(200).json({
      isSuccess: true,
      data: newproducts,
      count: newproducts.length,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProduct,
  getProducts,
  getProduct,
  patchProduct,
  bulkAddproducts,
  globalErrorHandler
};
