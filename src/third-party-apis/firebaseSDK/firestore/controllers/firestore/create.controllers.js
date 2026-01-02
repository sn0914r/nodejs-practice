const { db } = require("../../config/firebase.config");
const COLLECTION = process.env.FIREBASE_COLLECTION_NAME || "users";
const addResource = async (req, res, next) => {
  try {
    const data = req.body;
    await db.collection(COLLECTION).add(data);

    res.status(201).json({
      success: true,
      message: "resource created",
    });
  } catch (error) {
    res.statusCode = 500;
    next(error);
  }
};

const setResoure = async (req, res, next) => {
  try {
    const data = req.body;

    if (!data.customID) {
      res.statusCode = 400;
      throw new Error("customID is required");
    }

    await db.collection(COLLECTION).doc(data.customID).set(data);

    res.status(201).json({
      success: true,
      message: "resource created",
    });
  } catch (error) {
    statusCode = 500;
    next(error);
  }
};

module.exports = {
  addResource,
  setResoure,
};
