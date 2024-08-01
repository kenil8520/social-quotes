const {DataTypes} = require("sequelize")
const sequelize = require("../utils/connectToDB")

const User = sequelize.define("User", {
    first_name:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    last_name:{
        type:DataTypes.STRING(30),
        allowNull: true
    },
    email: {
        type: DataTypes.STRING(50),
        unique: true,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    token:{
        type: DataTypes.STRING(200),
        allowNull: true
    },
    is_admin:{
        type: DataTypes.BOOLEAN,
        defaultValue:false
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'created_at'
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        field: 'updated_at'
    },
    deleted_at:{
        type: DataTypes.DATE,
        allowNull: true
    }

},
{
    freezeTableName: true
}
)
User.associate = (models) => {
    User.hasMany(sequelize.define('quote'))
}
module.exports = User

