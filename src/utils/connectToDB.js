const dbConfig = require('../../config/db.js')
const {Sequelize, DataTypes} = require('sequelize')


const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,{
        host:dbConfig.HOST,
        dialect:dbConfig.dialect,
        logging: false
    },
    )

sequelize.authenticate()
.then(() => {
    console.log("connection established");
})
.catch((error) =>{
    console.log("error", error);
})

sequelize.sync({ force:false })

// sequelize.sync({alter:true, drop:false})


module.exports = sequelize;


