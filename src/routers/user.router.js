const express = require('express');
const {userRegistration, userLogin, forgotPassword, resetPassword, changePassword, logOut} = require('../controllers/user.controller.js')
const verifyToken = require('../middleware/auth.middleware.js');
const {createUser, passwordValidation, emailValidate, resetpasswordValidator, changepasswordValidator} = require('../middleware/validator.middleware.js')


const router = express.Router();

router.post('/sign-up', createUser, userRegistration);

router.post('/login', emailValidate, userLogin);

router.post('/forgot-password', emailValidate, forgotPassword);

router.post('/reset-password', resetpasswordValidator, resetPassword);

router.post('/change-password', verifyToken, changepasswordValidator, changePassword);

router.post('/logout', verifyToken, logOut);

module.exports = router;
