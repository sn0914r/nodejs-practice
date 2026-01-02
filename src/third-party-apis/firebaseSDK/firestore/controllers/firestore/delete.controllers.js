const { db } = require("../../config/firebase.config");
const COLLECTION = process.env.FIREBASE_COLLECTION_NAME || "users";

const deleteResource = async (req, res, next) => {
  try {
    const id = req.params.id;

    const ref = await db.collection(COLLECTION).doc(id);

    await ref.delete();

    res.status(200).json({
      success: true,
      message: "resource deleted",
    });
  } catch (error) {
    res.statusCode = 505;
    next(error);
  }
};

module.exports = { deleteResource };
