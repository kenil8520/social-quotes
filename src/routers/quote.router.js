const express = require('express');
const {createQuote, listQuotes, commentQuotes, deleteQuotes, likeQuotes, dislikeQuotes} = require('../controllers/quote.controller.js');
const {getQuotes} = require('../controllers/admin.controller.js')
const verifyToken = require('../middleware/auth.middleware.js');

const router = express.Router();

router.post('/create-quote', verifyToken, createQuote);

router.get('/get-my-quote', verifyToken, listQuotes);

router.get('/get-quote', verifyToken, getQuotes);

router.delete('/delete-quote', verifyToken, deleteQuotes);

router.post('/comment-quote', verifyToken, commentQuotes);

router.put('/like', verifyToken, likeQuotes);

router.put('/dislike', verifyToken, dislikeQuotes);

module.exports = router;
