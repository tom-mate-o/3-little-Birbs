const express = require('express');
const router = express.Router();
const Post = require('../models/postSchema'); // Pfad zu Ihrem Post-Modell

router.post("/", async (req, res) => {
    try {
        const post = req.body;
        const {goodthing1, goodthing2, goodthing3, message, reciever} = post;
        console.log(post);

        // check if goodthing1, goodthing2, goodthing3, message are not empty
        if (!goodthing1 || !goodthing2 || !goodthing3 || !message) {
            return res.status(400).send({message: "Fields cannot be empty!"});
        }

        // check if goodthing1, goodthing2, goodthing3 are not too long // too short
        if (goodthing1.length < 3 || goodthing2.length < 3 || goodthing3.length < 3 || 
            goodthing1.length > 60 || goodthing2.length > 60 || goodthing3.length > 60) {
            return res.status(401).send({message: "Fields must be between 3 and 60 characters long!"});
        }

        // check if message is not too long
        if (message.length > 100 || message.length < 3) {
            return res.status(402).send({message: "Message must be between 3 and 100 characters long!"});
        }

        // check if reciever is not empty
        if (!reciever) {
            return res.status(403).send({message: "Reciever cannot be empty!"});
        }


        const awaitPost = await Post.create(post);
        res.status(201).send({message: "Post added successfully to DB!"});
    } catch (error) {
        console.error("Error adding post to DB", error);
        res.status(500).send({message: "Error adding post to DB"});
    }
});

module.exports = router;