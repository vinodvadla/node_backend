const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

// dotenv.config();

const app = express();
const port = 3000;

// Configure Cloudinary
cloudinary.config({
  cloud_name: "dybup53nz",
  api_key: "669895999757857",
  api_secret: "mVMdtiCjlId5QWSaM3xf6aq8q28",
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
app.use(express.static('./uploads'));

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const filePath = req.file.path;

  cloudinary.uploader.upload(filePath, (error, result) => {
    if (error) {
      console.error("Cloudinary upload error:", error);
      return res.status(500).send("Cloudinary upload failed");
    }

    // fs.unlink(filePath, (err) => {
    //   if (err) {
    //     console.error("Failed to delete file:", err);
    //   }
    // });
    res.json({ url: result.secure_url });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log("this is main branch code")
});
