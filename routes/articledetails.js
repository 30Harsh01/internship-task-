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
const JWT_SCRET = 'internshiptask'    //this must be kept screat


//post article
router.post('/postarticle/:categoryId', fetchUser, async (req, res) => {
    const { title, content, metadata } = req.body
    const { categoryId: category } = req.params
    const checkCategory = await Category.findById(category)
    // console.log(checkCategory)
    if (!checkCategory) {
        return res.status(404).json({ error: "Category not available" })
    }
    if (!title || !content) {
        return res.status(400).json({ error: "title,content, required" })
    }
    // console.log(req.user._id)
    // console.log(req.user._id)
    // console.log(req.user.name)
    try {
        let article = await Article.create({
            author: req.user._id,
            authorname: req.user.name,
            metadata,
            categoryname: checkCategory.name,
            title,
            content,
            category
        })
        const generateNotification=await Notification.create({
            user:req.user._id,
            message:"You have generated an article",
            type:"Info"
        })
        await article.save()
        await generateNotification.save()
        res.status(200).json({ article , generateNotification})
    } catch (err) {
        console.log(err)
        res.json({ "err": err })
        res.status(500)
    }
})

//deletearticle
router.delete('/deletearticle/:articleid', fetchUser, async (req, res) => {
    try {
        let selectedArticle = await Article.findById(req.params.articleid)
        // console.log(Article)
        // console.log(selectedArticle.author)
        // console.log(req.user._id)
        if (!selectedArticle) { return res.status(404).send("Not found") }
        if (selectedArticle.author.toString() !== req.user._id.toString()) {
            return res.status(401).send("Not allowed")
        }
        selectedArticle = await Article.findByIdAndDelete(req.params.id)
        const generateNotification=await Notification.create({
            user:req.user._id,
            message:"You have deleted an article",
            type:"Danger"
        })
        await generateNotification.save()
        res.json({ message: "Article has been deleted" ,generateNotification})
    } catch (error) {
        res.status(500).send('internal server error')
        // console.log(error)
    }
})


//updateArticle
router.put('/updatearticle/:articleid/:categoryid', fetchUser, async (req, res) => {
    try {
        const { title, content, metadata } = req.body
        const { categoryid: category } = req.params
        const checkCategory = await Category.findById(category)
        console.log(checkCategory)
        if (!checkCategory) {
            return res.status(404).json({ error: "Category not available" })
        }
        if (!title || !content) {
            return res.status(400).json({ error: "title,content, required" })
        }
        //create a new Article
        const newArticle = {};
        if (title) { newArticle.title = title }
        if (content) { newArticle.content = content }
        if (metadata) { newArticle.metadata = metadata }
        if (category) { newArticle.category = category }
        //

        let checkArticle = await Article.findById(req.params.articleid)
        // console.log(Article)
        if (!checkArticle) { return res.status(404).send("Not found") }
        console.log(req.user._id.toString())
        if (checkArticle.author.toString() !== req.user._id.toString()) {
            return res.status(401).send("Not allowed")
        }

        checkArticle = await Article.findByIdAndUpdate(req.params.articleid, { $set: newArticle }, { new: true })
        const generateNotification=await Notification.create({
            user:req.user._id,
            message:"You have updated an article",
            type:"Warning"
        })
        await generateNotification.save()
        res.json({ checkArticle , generateNotification })
    } catch (error) {
        res.status(500).send("Internal server error")
        console.log(error)
    }
})

//getarticle
router.get('/getarticles', fetchUser, async (req, res) => {
    try {
        const allArticles = await Article.find()
        res.send({ allArticles });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Internal Server Error');
    }
});

//get by author
router.get('/getbyauthor/:authorId', fetchUser, async (req, res) => {
    try {
        const { authorId: author } = req.params
        const articleByAuthor = await Article.find({ author })
        res.status(200).send({ articleByAuthor })
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
})


//getbycategory
router.get('/getbycategory/:categoryId', fetchUser, async (req, res) => {
    try {
        const { categoryId: category } = req.params
        const articleByCategory = await Article.find({ category })
        res.status(200).send({ articleByCategory })
    } catch (error) {
        console.log(error)
        res.status(500).send("internal server error")
    }
})

module.exports = router;


