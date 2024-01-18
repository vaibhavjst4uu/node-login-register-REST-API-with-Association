const jwt = require("jsonwebtoken");
require("dotenv").config();
const db = require("../Models/dbModel");
const { sendRegistrationEmail} = require("../Mails/nodeMailer");
// const { send } = require("process");
const SECRET_KEY = "vaibhav"; 
const validator = require("../Middlewares/validateCredentials");

// @desc    Register user
let User = db.users;

const register = async(req,res)=>{
    console.log(req.file);
    let {user_role,...userData}= req.body;
    const data = {...userData,profilePicture:req.file.path};
    try{
        const user = await User.create(data);

        sendRegistrationEmail(user.name,user.email);
        res.status(200).json({
            statusCode: 200,
            status: "success",
            message: "User registered successfully.",
      
            // token : token,
            Data: [
              {
                id: user.id,
                name: user.name,
                email: user.email,
                // ...user
              },
            ],
          });
    }catch(e){
        res.status(400).json(validator.validate(e));
    }
}


//for login
const login = async (req, res) => {
    const { email, password } = req.body;
  
    try {
      const user = await User.findOne({ where: { email, password } });
  
      if (!user) {
        //   return res.status(401).send('Invalid username or password');
        throw new Error("Incorrect Email/Password");
      }else{
        
      }

      const payloads = {
        email: user.email,
        user_role: user.user_role,

      }
      const token = jwt.sign(payloads, SECRET_KEY); //
      res.status(200).json({
        responseCode: 200,
        responseStatus: "Success",
        message: "Logged in Successfully",
        response: {
          token: token,
          data: [
            {
              ID: user.id,
              Email: email,
              Name: user.name,
            },
          ],
        },
      });
    } catch (err) {
      // console.log(err);
      res.status(500).json({
        responseCode: 500,
        responseStatus: "Server Error",
        message: err.message,
      });
    }
  };














module.exports = {
    register,login
}