const express = require("express");
const router = express.Router();
const userCtrl = require("../Controllers/userController");
const uploadMW = require("../Middlewares/multer");
const loginValidation = require("../Middlewares/loginValidation");


// routes
router.post("/signup",uploadMW.upload.single("profilePicture"), userCtrl.register); // create a new user
router.post("/login", [loginValidation.validateLogin] , userCtrl.login);//login for existing user


module.exports = router;


