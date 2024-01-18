const Sequelize = require('sequelize');
const sequelize = new Sequelize(
    "registrationLoginDB",
    "root",
    "Vaibhav6898@",
    {
        host:"localhost",
        logging:false,
        dialect:"mysql",

        pool:{
        max: 5,
        min:0,
        acquire:30000,
        idle:10000,
        },
    }
   
);

sequelize.authenticate()
.then(()=>{
    console.log("Database is connected");

}).catch((e)=>{
    console.error("Error in connecting to the database : "+ e)
});


const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModel")(sequelize, Sequelize.DataTypes);
db.roles = require("./roleModel")(sequelize, Sequelize.DataTypes);
db.projects = require("./projectModel")(sequelize, Sequelize.DataTypes);

db.sequelize
.sync()//{force:true}
.then(()=>{
    console.log("Table created");
}).catch((e)=>{
    console.log("An error occured while creating the table");
});


module.exports = db;