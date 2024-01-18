// const { User } = require('../Models/userModel');
const db = require("../Models/dbModel");
let User = db.users;

let responseFormate = {
  status: 400,
  message: "invalid data",
  error: [],
  data: [],
};

const validateLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // Check if username exists in the database
    const user = await User.findOne({ where: { email } });
    responseFormate.error = [];
    responseFormate.data = [];

    if (!user) {
      responseFormate.error.push({
        field: "Email",
        messege: "user with given email does not exist",
      });
      return res.status(401).json(responseFormate);
    }

    // Additional validation logic (password check, etc.)
    // You may use a library like bcrypt to hash and compare passwords
    // For demonstration purposes, this example compares plaintext passwords
    if (user.password !== password) {
      responseFormate.error.push({
        field: "Password",
        messege: "Incorrect Password",
      });
      return res.status(401).json(responseFormate);
    }else{
        
    }

    // If all validations pass, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // console.error("Error validating login:", error);
    // res.status(500).send("Error validating login");
    responseFormate.error = [];
    responseFormate.data = [];
    responseFormate.error.push({
      field: error.path,
      message: error.message,
    });
  }
};

module.exports = {
  validateLogin,
};
