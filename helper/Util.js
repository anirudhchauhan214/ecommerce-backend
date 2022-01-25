const multer = require("multer");
const fs = require("fs");

const storeFile = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "./uploads/images/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});

const uploadImg = multer({
  storage: storeFile,
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|webp)$/)) {
      return cb(new Error("Please upload an Image!!"));
    }
    cb(undefined, true);
  },
});

const deleteImg = (files) => {
  files.map((file, i) => {
    fs.unlink(file.path, (err) => console.log(err));
  });
};

module.exports = { uploadImg, deleteImg };
