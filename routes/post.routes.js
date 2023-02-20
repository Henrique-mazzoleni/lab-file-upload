const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Post = require("../models/Post.model");

const { isLoggedIn } = require("../middleware/route-guard");
const fileUploader = require("../config/cloudinary.config");

router.get("/new-post", isLoggedIn, (req, res) => res.render("users/new-post"));

router.post('/new-post', isLoggedIn, fileUploader.single('post-picture'), async (req, res, next) => {
    const { content, picName } = req.body
    const picPath = req.file.path

    try {
        const post = await Post.create({content, creatorId: req.session.currentUser._id, picPath, picName })
        console.log(post)
        res.redirect('/user-profile')

    } catch (error) {
        next(error)
    }
})

module.exports = router;
