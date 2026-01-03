const { db } = require("../../../config/firebase.config");
const COLLECTION = process.env.FIREBASE_COLLECTION_NAME || "users";

const updateResource = async (req, res, next) => {
  try {
    const id = req.params.id;

    const ref = await db.collection(COLLECTION).doc(id);
    let snap = await ref.get();

    // console.log("Before patch:");
    // console.table({
    //   id: snap.id,
    //   ...snap.data(),
    // });

    if (!snap.exists) {
      res.statusCode = 404;
      throw new Error("Document doesn't exist");
    }

    await ref.update(req.body);

    snap = await ref.get();

    // console.log("After patch:");
    // console.table({
    //   id: snap.id,
    //   ...snap.data(),
    // });

    const { customID, ...rest } = snap.data();

    const updatedUser = {
      ...rest,
      id: snap.id,
    };

    res.status(200).json({
      success: true,
      data: updatedUser,
      message: "resource updated successfully",
    });
  } catch (error) {
    res.statusCode = 500;
    next(error);
  }
};

module.exports = {
  updateResource,
};
