const express = require('express');
const app = express();

//creating PORT
let port = process.env.PORT || 8080;

//require router
let indexRouter=require('./Routes/index');

//creating db;
require("./Models/dbModel");


//using builtin middlewares
app.use(express.json()); //parses incoming requests with JSON payloads
app.use(express.urlencoded({ extended: true })); //parse URL-encoded data
app.set("view engine", "ejs");

//use routes
app.get('/',(req,res)=>{
    res.send("Welcome to the API");
})
app.use('/',indexRouter);


//listen to port
app.listen(port, ()=>{
    console.log(`Server is running on ${port}`);
    });



