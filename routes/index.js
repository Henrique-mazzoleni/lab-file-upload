const router = require("express").Router();

const Post = require('../models/Post.model')

/* GET home page */
router.get("/", async (req, res, next) => {
  try {
    const allPosts = await Post.find()
    console.log(allPosts)
    res.render("index", { user: req.session.currentUser, allPosts });
  } catch (error) {
    next(error)
  }

});

module.exports = router;
