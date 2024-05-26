const express = require('express')
const User = require('../modules/userSchema')
const Article=require('../modules/articleSchema')
const Category=require("../modules/categoryschema")
const Comments=require('../modules/commentsSchema')
const router = express.Router();
const Notification=require("../modules/notificationSchema")
// const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const fetchUser=require('../middleware/fetchuser')
const JWT_SCRET='internshiptask'    //this must be kept screat


router.post('/comment/:articleid',fetchUser,async(req,res)=>{
    try {
        const {articleid}=req.params
        if(!articleid){
            return res.status(404).json({error:"article required"})
        }
        const checkarticleid=await Article.findById(articleid)
        if(!checkarticleid){
            return res.status(400).json({error:"article doesnt exist"})
        }
        const {comment}=req.body;
        if(!comment){
            return res.status(404).json({error:"Comments required"})
        }
        const newComment=await Comments.create({
            commentedBy:req.user._id,
            commentedOn:articleid,
            comment
        })
        await newComment.save()
        const generateNotification=await Notification.create({
            user:req.user._id,
            message:"You have commented on an article",
            type:"Warning"
        })
        await generateNotification.save()
        res.status(200).json({message:"Comment saved",newComment, generateNotification})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})

router.get('/getallcomment',fetchUser,async(req,res)=>{
    try {
        // console.log(req.user._id)
        const FindComments=await Comments.find({commentedBy:req.user._id})
        // console.log(FindComments)
        res.status(200).json({FindComments})
    } catch (error) {
        console.log(error)
        res.status(400).send("error")
    }
})


module.exports=router