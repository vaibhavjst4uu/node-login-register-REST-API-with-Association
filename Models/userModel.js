
const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("./dbModel");

module.exports = (sequelize, DataTypes) => {
  const users = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name cannot be empty" },
        },
      },
      email: {
        type: DataTypes.STRING,
        unique: {
          args:true,  
          msg: "email already in use",
        },
        validate: {
          isEmail: {
            msg: "Please enter a valid Email Id",
          },
          notEmpty: { msg: "Email cannot be Empty" },
          
        },
        // defaultValue : "test@gmail.com"
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
       
          isStrongPassword(value) {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;.?~\\/-]).{5,15}/.test(value)) {
              throw new Error("Password must have 1 lowercase, 1 uppercase, 1 special character, and be 5-10 characters long.");
            }
            if(/<[^>]*>/.test(value)){
              throw new Error("warning your Password should not contains HTML tags");
            }
        },
          notEmpty: { msg: "Password cannot be empty" },
        },
      },
      mobile:{
        type: DataTypes.STRING(10), // Specify the length as 10 characters
        allowNull: false,
        validate: {
          len:{
           args: [10, 10],
           msg: "Mobile number must be of 10 digits"
          }, // Enforce exactly 10 characters
          isNumeric:{
            args:true,
            msg:"Only Numerical values are allowed."
          } // Ensure the mobile field contains only numbers
        },

      },
      profilePicture: {
        type: DataTypes.STRING, // Assuming the profile picture is stored as a file path or URL
        allowNull: true, // Allow null if a user doesn't have a profile picture
      },
      status:{
        type:DataTypes.ENUM('active','inactive'),
        defaultValue:'active',
        validate:{
            isIn:{
                args:[['active','inactive']],
                msg:"Status must either 'active' or 'inactive'"
            }
        }
      },
      projects_assign:{
        type: DataTypes.JSON,
        allowNull: true,
        defaultValue: [], // Provide a default value if necessary

      },
      user_role:{
        type:DataTypes.ENUM('admin','user'),
        defaultValue:"user",
        validate:{
            isIn: {
                args: [['admin', 'user']],
                msg: 'Invalid role. Allowed values are admin and user',
              },
        }
      }
    },
    {
      timestamps: true,
    }
  );
//   users.associate = function (models) {
//     users.hasMany(models.Project, { foreignKey: 'user_id' });
//     users.belongsToMany(models.Skill, { through: models.Users_Skills});
//     };
  return users;
};

