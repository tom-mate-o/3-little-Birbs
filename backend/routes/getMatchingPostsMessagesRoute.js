// getMatchingPostsMessagesRoute.js

const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Pfad zu Ihrem Post-Modell

router.post("/", async (req, res) => {

    const { recievedPostIDs } = req.body;

    try {
        const posts = await Post.find({ id: { $in: recievedPostIDs } });
        console.log("Success - Getting Posts from Pool DB");
        res.status(200).json(posts);
    } catch (error) {
        console.error("Error getting posts from DB", error);
        res.status(500).send({message: "Error getting posts from DB"});
    }
});

module.exports = router;