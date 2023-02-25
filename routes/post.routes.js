const router = require("express").Router();

const Post = require("../models/Post.model");
const Comment = require('../models/Comment.model')

const { isLoggedIn } = require("../middleware/route-guard");
const fileUploader = require("../config/cloudinary.config");

router.get("/new-post", isLoggedIn, (req, res) => res.render("users/new-post", {user: req.session.currentUser}));

router.post('/new-post', isLoggedIn, fileUploader.single('post-picture'), async (req, res, next) => {
    const { content, picName } = req.body
    const picPath = req.file.path

    try {
        const post = await Post.create({content, creatorId: req.session.currentUser._id, picPath, picName })
        res.redirect('/user-profile')

    } catch (error) {
        next(error)
    }
})

router.get('/post/:postId', async (req, res, next) => {
    try {
        const post = await Post.findById(req.params.postId).populate('creatorId').populate('comments').populate({
            path: 'comments',
            populate: {
                path: 'creatorId',
                model: 'User'
            }})
        res.render('post-detail', {user: req.session.currentUser, post})
    } catch (error) {
        next(error)
    }
    
})

router.post('/post/:postId/new-comment', isLoggedIn, fileUploader.single('comment-image'), async (req, res, next) => {
    const { content, imageName } = req.body
    const imagePath = req.file.path

    try {
        const post = await Post.findById(req.params.postId)
        const comment = await Comment.create({
            content,
            imagePath,
            imageName,
            creatorId: req.session.currentUser,
        })
        post.comments.push(comment._id)
        await post.save()
        res.redirect(`/post/${req.params.postId}`)

    } catch (error) {
        next(error)
    }
} )

module.exports = router;
