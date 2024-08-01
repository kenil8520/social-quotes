const jwt = require('jsonwebtoken');
const User = require('../models/user.model');


const verifyToken = async(req, res, next) =>{
    try{
        let token;
        let authHeader = req.headers.Authorization || req.headers.authorization;
        if (!authHeader){
            res.status(401).json({success : false, message: 'Authentication token missing'})
        }
        if (authHeader && authHeader.startsWith("Bearer")) {
        token = authHeader.split(" ")[1];
        const user = await User.findAll({where: {token}})
        if(user.length == 0) {
            return res.status(401).json({success : false, message: 'Unauthorized user login in to continue'})
        }
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({success : false, message: 'Unauthorized user'})
            }
            req.user = decoded.user;
            next();
        });

        if (!token) {
            res.status(401);
            throw new Error("User not authorized or token is missing");
        }
        }
    }catch(error){
        console.log(error);
    }
}
module.exports = verifyToken;
