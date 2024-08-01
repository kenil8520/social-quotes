const {body} = require ('express-validator')


exports.createUser = [
  body('first_name').not().isEmpty().withMessage("first_name is required"),
  body('first_name').isAlpha().withMessage('first_name must be a alphabet'),
  body('email').not().isEmpty().withMessage("email is required"),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password').not().isEmpty().withMessage('password is required'),
  body('password').isLength({min: 6}).withMessage('The minimum password length is 6 characters'),
]

exports.emailValidate = [
  body('email').not().isEmpty().withMessage("email is required"),
  body('email').isEmail().withMessage('Invalid email format'),
]

exports.passwordValidation = [
  body('password').not().isEmpty().withMessage('password is required'),
  body('password').isLength({min: 6}).withMessage('The minimum password length is 6 characters'),
]

exports.resetpasswordValidator = [
  body('newPassword').not().isEmpty().withMessage('newPassword is required'),
  body('newPassword').isLength({min: 6}).withMessage('The minimum password length is 6 characters'),
  body('confirmpassword').not().isEmpty().withMessage('confirmpassword is required'),
  body('confirmpassword').isLength({min: 6}).withMessage('The minimum password length is 6 characters'),
]

exports.changepasswordValidator = [
  body('oldPassword').not().isEmpty().withMessage('oldPassword is required'),
  body('oldPassword').isLength({min: 6}).withMessage('The minimum password length is 6 characters'),
  body('newPassword').not().isEmpty().withMessage('newPassword is required'),
  body('newPassword').isLength({min: 6}).withMessage('The minimum password length is 6 characters'),
  body('confirmPassword').not().isEmpty().withMessage('confirmPassword is required'),
  body('confirmPassword').isLength({min: 6}).withMessage('The minimum password length is 6 characters'),
]
