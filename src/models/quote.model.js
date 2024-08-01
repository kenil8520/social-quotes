const {DataTypes} = require("sequelize")
const sequelize = require("../utils/connectToDB")
const User = require("./user.model")

const quote = sequelize.define("quote", {
    quote: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    comment:{
        type: DataTypes.STRING(200),
        allowNull: true
    },
    like_count:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue : 0
    },
    dislike_count:{
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 0
    },
    deleted_at:{
        type: DataTypes.DATE,
        allowNull: true,
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
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        }
    },
},
{
    freezeTableName: true
})
quote.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE',
    as:'user'
});

module.exports = quote
