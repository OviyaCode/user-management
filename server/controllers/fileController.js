const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const fileFilter = function (req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".xlsx" && ext !== ".xls") {
    return cb(new Error("Only excel files are allowed"));
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

module.exports = upload;
