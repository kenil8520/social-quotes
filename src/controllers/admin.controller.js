const User = require("../models/user.model");
const {Op} = require('sequelize')
const Quote = require("../models/quote.model");
const Like = require("../models/like.model");
const quote = require("../models/quote.model");

const getUsers = async (req, res) => {
    try{
    const foundUser = await User.findOne({
        where: {
            id: req.user.id,
            is_admin: true
        }
    });
    if (!foundUser){
        return res.status(401).json({success:true, message:"you need admin previalges to continue"})
    }
    const user = await User.findAll({attributes: ['id', 'first_name', 'last_name', 'email', 'is_admin' , 'createdAt', 'updatedAt', 'deleted_at']})

    return res.status(200).json({success:true, data: user, message:"users retrieved successfully"})
    }

    catch(error){
        console.log(error);
        return res.status(500).json({success: false, message: "Internal Server Error"});
    }
}

const deleteUser = async (req, res) => {
    try{
        const user_id = req.query.user_id
        const data = await User.findOne({where:{id: user_id}})
        if(user_id === data.id){
            return res.status(400).json({ success: true, message:"you can not delete this user"})
        }
        if(!data){
            return res.status(400).json({ success: true, message:"invalid user id"})
        }
        if(data.deleted_at != null){
            return res.status(400).json({ success: true, message:"This user is already deleted"})
        }
        data.deleted_at = new Date();
        await data.save();
        return res.status(200).json({ success: true, message:"User deleted successfully"})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const getQuotes = async (req, res) => {
    try {
        let { page = 1, limit = 10, search } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;
        const whereClause = {};
        if (search) {
            whereClause.quote = { [Op.like]: `%${search}%` };
        }

        const totalCount = await Quote.count({ where: whereClause });
        let quotes = await Quote.findAll({
            where: whereClause,
            offset,
            limit,
            include: [{ model: User, attributes: ['id', 'first_name', 'email', 'is_admin'],
            as:"user",
        }]});
        for (let i = 0; i < quotes.length; i++) {
            let liked_user = [];
            let disliked_user = [];
            const likeData = await Like.findAll({
                where: { quote_id: quotes[i].id },
                include: [{ model: User, attributes: ['first_name'],
                as:'user_like' }]
            });
            likeData.map(item => {
                if(item.user_like){
                    liked_user.push(item.user_like.first_name)
                }
                if(item.user_dislike){
                    disliked_user.push(item.user_dislike.first_name)
                }
            })
            quotes[i].setDataValue('liked_by', liked_user);
            quotes[i].setDataValue('disliked_by', disliked_user);
        }

        return res.status(200).json({ success: true, data: quotes, page, limit, totalCount, message: "Data retrieved successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const deleteQuotes = async (req, res) => {
    try{
        const quote_id = req.query.quote_id
        const data = await Quote.findOne({where:{id: quote_id}})
        if(!data){
            return res.status(400).json({ success: true, message:"invalid quote id"})
        }
        if(data.deleted_at != null){
            return res.status(400).json({ success: true, message:"This post is already deleted"})
        }
        data.deleted_at = new Date();
        await data.save();
        return res.status(200).json({ success: true, message:"Quote deleted successfully"})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

const updateQuotes = async (req, res) => {
    try{
        const quote_id = req.query.quote_id;
        const { quote } = req.body
        const data = await Quote.findOne({where:{id: quote_id}})
        if(!data){
            return res.status(400).json({ success: true, message:"invalid quote id"})
        }
        data.quote = quote
        data.save()
        return res.status(200).json({ success: true, data:data, message:"Quote updated successfully"})
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

module.exports = {getUsers, deleteUser, getQuotes, deleteQuotes, updateQuotes}
