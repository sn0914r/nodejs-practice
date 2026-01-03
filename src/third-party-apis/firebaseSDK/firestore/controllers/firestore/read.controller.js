const { db } = require("../../../config/firebase.config");
const COLLECTION = process.env.FIREBASE_COLLECTION_NAME || "users";

const getSingleResource = async (req, res, next) => {
  try {
    const params = req.params.id;

    let doc = await db.collection(COLLECTION).doc(params).get();

    if (!doc.exists) {
      res.statusCode = 404;
      throw new Error("Required document not found");
    }

    const { customID, ...rest } = doc.data();

    doc = {
      id: doc.id,
      ...rest,
    };

    res.status(200).json({
      success: true,
      message: "document retrived successfully",
      data: doc,
    });
  } catch (error) {
    res.statusCode = 500;
    next(error);
  }
};

const getAllResources = async (req, res, next) => {
  try {
    let snapshot = await db.collection(COLLECTION).get();

    if (snapshot.empty) {
      return res.status(200).json({
        success: true,
        data: [],
        size: 0,
      });
    }

    const docs = snapshot.docs.map((doc) => {
      let { customID, ...rest } = doc.data();
      return {
        id: doc.id,
        ...rest,
      };
    });

    res.status(200).json({
      success: true,
      data: docs,
      size: docs.size,
    });
  } catch (error) {
    res.statusCode = 500;
    next(error);
  }
};
module.exports = {
  getSingleResource,
  getAllResources,
};
