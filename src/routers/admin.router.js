const express = require('express');
const {getUsers, deleteUser, getQuotes, deleteQuotes, updateQuotes} = require('../controllers/admin.controller');
const verifyToken = require('../middleware/auth.middleware');


const router = express.Router();

router.get('/get-users', verifyToken, getUsers);

router.delete('/delete-user', verifyToken, deleteUser);

router.get('/get-quotes', verifyToken, getQuotes);

router.delete('/delete-quotes', verifyToken, deleteQuotes);

router.put('/edit-quotes', verifyToken, updateQuotes);

module.exports = router;
