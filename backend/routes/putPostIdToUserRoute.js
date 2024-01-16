const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.put("/", async (req, res) => {
    try {
        const postId = req.body.id;
        const reciever = req.body.selectedFriendName;

        const postToAdd = { id: postId, read: false };

        const awaitPut = await User.findOneAndUpdate({ username: reciever }, { $push: { recievedPostsIds: postToAdd } });
        res.status(201).send({ message: "Post added successfully to User in DB!" });
    } catch (error) {
        console.error("Error adding friend to DB", error);
        res.status(500).send({ message: "Error adding Post to User in DB" });
    }
}
);

module.exports = router;