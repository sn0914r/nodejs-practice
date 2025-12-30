/* ================================================================================================================================
MULTER
npm i multer
================================================================================================================================ */
const express = require("express");
const multer = require("multer");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const cloudinaryConfig = require("./cloudinary.config");

const app = express();

app.use(cors());
app.use(express.json());

/* ===============================================================================
Multer: Saving files locally in "/uploads" folder
=============================================================================== */
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, `${path.join(__dirname, "uploads")}`);
  },

  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

app.post("/upload-locally", upload.single("file"), (req, res) => {
  res.status(200).json({
    success: true,
    data: req.file,
  });
});

/* ===============================================================================
Multer: Saving files in cloud (Cloudinary)
=============================================================================== */
const cloudinaryStorage = multer.memoryStorage();

const cloudinaryUpload = multer({
  storage: cloudinaryStorage,
});

app.post(
  "/upload-to-cloudinary",
  cloudinaryUpload.single("file2"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "file not found",
        });
      }

      let result = await cloudinaryConfig.uploader.upload(
        `data:${req.file.mimetype};base64,${req.file.buffer.toString(
          "base64"
        )}`,
        { resource_type: "image" }
      );

      res.status(200).json({
        success: true,
        imageUrl: result.secure_url,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err.message || "failed to upload",
      });
    }
  }
);

app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
