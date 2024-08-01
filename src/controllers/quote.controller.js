const User = require("../models/user.model");
const {Op} = require('sequelize')
const Quote = require("../models/quote.model");
const Like = require("../models/like.model");

const createQuote = async (req, res) => {
  try {
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({success: false, message: "Request body is empty provide quote field"});
    }
    const { quote } = req.body;
    if (!quote) {
      return res.status(400).json({ success: false, message: "Please provide quote field" });
    }
    const existingQuote = await Quote.findOne({
      where: {
        userId: req.user.id,
        quote: quote,
      },
    });

    if (existingQuote) {
      return res.status(400).json({success: false, message: "This quote already exists for the user"});
    }

    const data = await Quote.create({
      quote: quote,
      userId: req.user.id,
    });
    return res.status(201).json({success: true, message: "Quote created successfully", data: data,});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

const listQuotes = async (req, res) => {
    try {
        let { page = 1, limit = 10, search } = req.query;
        page = parseInt(page);
        limit = parseInt(limit);

        const offset = (page - 1) * limit;
        const whereClause = {
            userId: req.user.id,
            deleted_at: null
        };

        if (search) {
            whereClause.quote = { [Op.like]: `%${search}%` };
        }

        const totalCount = await Quote.count({ where: whereClause });
        const data = await Quote.findAll({
            where: whereClause,
            offset,
            limit,
        });

        if (data.length === 0) {
            return res.status(404).json({ success: false, message: "No data found for this user" });
        }
        return res.status(200).json({ success: true, data, page, limit, totalCount, message: "Data retrieved successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ success: false, message: "Internal Server Error" });
    }
};

const deleteQuotes = async (req, res) => {
    try{
        const quote_id = req.query.quote_id
        const user = req.user.id
        const data = await Quote.findOne({where:{id: quote_id, userId:{[Op.eq]:user}}})
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

const commentQuotes = async (req, res) => {
  try{
    const quote_id = req.query.quote_id
    const comment = req.body.comment
    const data = await Like.create({
      user_id: req.user.id,
      quote_id: quote_id,
      comment: comment
    });
    return res.status(200).json({ success: true, data: data, message: "Comment successfully posted" });
  }
  catch(error){
    console.log(error);
    return res.status(500).json({success:false,message:'Internal Server Error'});
  }
}

const likeQuotes = async (req, res) => {
  try{
    const user = req.user;
    const quote_id = req.query.quote_id;
    const {like} = req.body

    const existingLike = await Like.findOne({
      where: {
        user_id: user.id,
        quote_id: quote_id
      }
    });
    if (existingLike) {
      await existingLike.destroy();
      const likeCount = await Like.count({
        where: {
          quote_id: quote_id,
          like: true
        }
      });

      await Quote.update(
        { like_count: likeCount },
        { where: { id: quote_id } }
      );

      return res.status(200).json({ success: true, message: "You have removed like from this post " });
    }
    await Like.create({
      user_id: user.id,
      quote_id: quote_id,
      like: like
    });
    const likeCount = await Like.count({
      where: {
        quote_id: quote_id,
        like: true
      }
    });
    await Quote.update(
      { like_count: likeCount },
      { where: { id: quote_id } }
    );
    return res.status(200).json({ success: true, message:"liked the post successfully"})
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ success: false, message:"Internal Server Error" });
  }
}

const dislikeQuotes = async (req, res) => {
  try{
    const user = req.user;
    const quote_id = req.query.quote_id;
    const {dislike} = req.body

    const existingDislike = await Like.findOne({
      where: {
        user_id: user.id,
        quote_id: quote_id
      }
    });
    if (existingDislike) {
      await existingDislike.destroy();
      const dislikeCount = await Like.count({
        where: {
          quote_id: quote_id,
          dislike: true
        }
      });

      await Quote.update(
        { dislike_count: dislikeCount },
        { where: { id: quote_id } }
      );
      return res.status(200).json({ success: true, message: "You have removed disliked from this post " });
    }
    await Like.create({
      user_id: user.id,
      quote_id: quote_id,
      dislike: dislike
    });
    const dislikeCount = await Like.count({
      where: {
        quote_id: quote_id,
        dislike: true
      }
    });
    await Quote.update(
      { dislike_count: dislikeCount },
      { where: { id: quote_id } }
    );
    return res.status(200).json({ success: true, message:"disliked the post successfully"})
  }
  catch(error){
    console.log(error);
    return res.status(500).json({ success: false, message:"Internal Server Error" });
  }
}

module.exports = {createQuote, listQuotes, deleteQuotes, commentQuotes, likeQuotes, dislikeQuotes};
