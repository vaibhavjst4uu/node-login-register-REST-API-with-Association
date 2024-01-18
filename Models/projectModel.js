const { DataTypes, Sequelize} = require("sequelize");
const { sequelize } = require("./dbModel");

module.exports = (sequelize, DataTypes)=>{
    const projects = sequelize.define(
        "projects",
        {
            id: {
                type:DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement:true
            },
            name:{
                type:DataTypes.STRING,
                unique:true,
                allowNull:false,
                validation:{
                    isEmpty:{
                        args:[true],
                        msg:"Project Name cannot be empty"
                    }
                }
            },
            status:{
                type:DataTypes.ENUM('active','completed'),
                defaultValue:'active',
                allowNull:false,
                validation:{
                    isIn:{
                        args:[['active','completed']],
                        msg:`Status must be one of ${['active','completed']}`
                    }
                } 
            }    
        },{
            timestamps:true,
        }
    );
    //associations can go here!
    // projects.belongsToMany(sequelize.models.users, {through: 'project_user'});
    // projects.hasOne(sequelize.models.tasks, {as :'mainTask', foreignKey: 'projectId'});
    return projects;
}