const express = require('express')
const userRouter = require('./user.router.js')
const quoteRoter = require('./quote.router.js')
const adminRouter = require('./admin.router.js')

const router = express.Router()

router.use("",userRouter, quoteRoter)
router.use("/admin",adminRouter)

module.exports = router;
