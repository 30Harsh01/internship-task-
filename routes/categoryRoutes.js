const express = require('express')
const User = require('../modules/userSchema')
const Article=require('../modules/articleSchema')
const Category=require("../modules/categoryschema")
const router = express.Router();
// const { body, validationResult } = require('express-validator')
const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken')
const fetchUser=require('../middleware/fetchuser')
const JWT_SCRET='internshiptask'    //this must be kept screat


router.post('/postcategory',async(req,res)=>{
    try {
        const {name}=req.body
        if(!name){
            return res.status(404).json({error:"Category required"})
        }
        const checkCategory=await Category.findOne({name})
        if(checkCategory){
            return res.status(400).json({error:"Category already exist"})
        }
        const newCategory=await Category.create({
            name
        })
        await newCategory.save()
        res.status(200).json({message:"Category saved",newCategory})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
})

module.exports=router