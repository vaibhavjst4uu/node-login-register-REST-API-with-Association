const { DataTypes, Sequelize } = require("sequelize");
const { sequelize } = require("./dbModel");

module.exports = (sequelize, DataTypes)=>{
    const roles = sequelize.define(
        "roles",
        {
            id:{
                type:DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement:true,
            },
            name:{
                field:"role",
                type:DataTypes.STRING,
                allowNull:false,
                validate:{
                    notEmpty:{
                        msg:"Role cannot be empty",
                    }
                },
            },
            status:{
                field:'active',
                type:DataTypes.BOOLEAN,
                defaultValue:true,
            }
        },{
            timestamp: true,
        }
    );
    //association 
    // roles.belongsToMany(sequelize.models.users, { through: 'users_roles' });

    return roles;
}