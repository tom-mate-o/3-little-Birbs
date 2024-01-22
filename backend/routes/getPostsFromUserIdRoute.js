// getPostsFromUserIdRoute.js

const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Pfad zu Ihrem Post-Modell

router.post("/", async (req, res) => {
    try {
        // extract User-ID from Token
        const userId = req.body.userId;

        // search for Posts from User
        const posts = await Post.find({posterID: userId});
        if (!posts){
            return res.status(404).json({ message: "Posts not found" });
        }

        // send Posts to frontend
        res.status(200).json({ posts: posts });
        console.log("Posts from " +userId +" sent to frontend!");

    } catch (error) {
        console.error("Error while getting posts from DB!", error);
        res.status(500).send({message: "Error while getting posts from DB!"});
    }
});

module.exports = router;