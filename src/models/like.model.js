const {DataTypes} = require("sequelize")
const sequelize = require("../utils/connectToDB")
const User = require("./user.model")
const Quote = require("./quote.model")

const Like = sequelize.define("Like", {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'User',
            key: 'id'
        },
    },
    quote_id:{
        type : DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Quote',
            key: 'id'
        }
    },
    like: {
        type : DataTypes.BOOLEAN,
        defaultValue : false
    },
    dislike:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    comment:{
        type: DataTypes.TEXT,
        allowNull:true
    }
},
{
    freezeTableName: true
}

);


Like.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
    as:'user_like'
});

module.exports = Like
