const multer = require("multer");
const fs = require("fs");
const nodemailer = require("nodemailer");
const path = require("path");
const handlebars = require("handlebars");

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

const sendEmail = async (email, name, userId) => {
  const filePath = path.join(__dirname, "./email.html");
  const source = fs.readFileSync(filePath, "utf-8").toString();
  const template = handlebars.compile(source);
  const replacements = {
    name,
    userId,
  };
  const htmlToSend = template(replacements);

  try {
    const transporter = nodemailer.createTransport({
      service: process.env.MAILER_SERVICE,
      port: 587,
      secure: true,
      auth: {
        user: process.env.MAILER_USER,
        pass: process.env.MAILER_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAILER_USER,
      to: email,
      subject: "Reset Password",
      text: "Reset Password",
      html: htmlToSend,
    });

    console.log("email sent sucessfully");
  } catch (error) {
    console.log(error, "email not sent");
  }
};

module.exports = { uploadImg, deleteImg, sendEmail };
