const multer = require("multer");

const storeFile = multer.diskStorage({
  destination: (req, res, cb) => {
    cb(null, "../uploads/images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "--" + file.originalname);
  },
});
const uploadImg = multer({ storage: storeFile });

module.exports = { uploadImg };
