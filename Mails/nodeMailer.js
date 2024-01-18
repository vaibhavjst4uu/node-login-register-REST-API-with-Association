const nodemailer = require("nodemailer");
require("dotenv").config();
let path = require('path');
let ejs = require('ejs');

// console.log(process.env.user);
// console.log(process.env.pass);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.user,
    pass: process.env.pass,
  },
});

const sendRegistrationEmail = async(userName,userEmail) => {
    //saving path of my template in template variable
  const template = path.join(__dirname,"../Views/registrationEmailTemplate.ejs");

  //rendering data inside data variable to pass it to HTML in mail option
  const data = await ejs.renderFile(template, {userName,userEmail});

  const mailOptions = {
    from: {
      name: "Vaibhav Raj",
      address: process.env.user,
    },
    to: userEmail,
    subject: "Welcome to our Website",
    html: data
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  sendRegistrationEmail,
};
