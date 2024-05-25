const multer = require('multer');
const path = require('path');

const uploadAny=multer().any()

const uploadMultiple = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5000000 },
    fileFilter: function (req, file, cb) {
      checkFileType(file, cb);
    }
  }).array("image", 12);

const uploadSingle = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 5000000 }, //1MB
    fileFilter: async function (req, file, cb) {
    checkFileType(file, cb);
    }
  }).single("image");

function checkFileType(file,cb) {
     // Allowed ext 
  const fileTypes = /jpeg|jpg|png|gif/; //regex
  // Check ext
  const extName = fileTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime
  const mimeType = fileTypes.test(file.mimetype);

  if (mimeType && extName) {
    return cb(null, true);
  } else {
    cb("Error: Images Only !!!");
  }
}

module.exports = { uploadMultiple, uploadSingle ,uploadAny };