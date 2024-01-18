const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
     return cb(null, './uploads');//location where you want to save the file
    },
    filename: function (req, file, cb) {
     return cb(null, `${Date.now()}-${file.originalname}`);//creating a unique file name
    }
  })
  
  const upload = multer({ storage });//creating a upload instance of multer storage

  module.exports = {
    upload,
  }