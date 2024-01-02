const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Pfad zu Ihrem Post-Modell

router.post("/", async (req, res) => {
    try {
        const post = req.body;
        console.log(post);
        const awaitPost = await Post.create(post);
        res.status(201).send({message: "Post added successfully to DB!"});
    } catch (error) {
        console.error("Error adding post to DB", error);
        res.status(500).send({message: "Error adding post to DB"});
    }
});

module.exports = router;