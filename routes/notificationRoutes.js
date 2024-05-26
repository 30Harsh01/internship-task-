const express = require('express')
const User = require('../modules/userSchema')
const Article = require('../modules/articleSchema')
const Category = require("../modules/categoryschema")
const Notification = require("../modules/notificationSchema")
const router = express.Router();
// const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchuser')


router.get('/getUserNotification',fetchUser,async(req,res)=>{
    try {
        const Notifications=await Notification.find({user:req.user._id})
        res.status(200).json({Notifications})
    } catch (error) {
        console.log(error)
        res.status(400).json({error:"Internal server error"})
    }
})


module.exports=router