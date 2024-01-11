// getPostWithIdRoute.js

const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Pfad zu Ihrem Post-Modell

router.get("/:postId", async (req, res) => {

    // extract post id from url
    const postId = req.params.postId;
    console.log(postId);

    try {
        const loadpost = await Post.findOne({ id: postId });
        console.log("Success - Getting Post from ID");
        res.status(200).json(loadpost);
    } catch (error) {
        console.error("Error getting post from ID", error);
        res.status(500).send({message: "Error getting post from ID"});
    }


});

module.exports = router;