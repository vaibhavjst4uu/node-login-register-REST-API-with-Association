const express = require('express');
const router = express.Router();

// Require Routes modules.

let userRoute = require('./userRoute');
let projectRoute = require('./projectRoute');
let roleRoute = require('./roleRoute');

//use routes
router.use('/user', userRoute);
// router.use('/projects', projectRoute);
// router.use('/roles', roleRoute);



//export router
module.exports = router;


