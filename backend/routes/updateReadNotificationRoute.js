// updateReadNotificationRoute.js


const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.put("/", async (req, res) => {
    try {
        const userId = req.body.userId;
        const friendcode = req.body.friendcode;
        const postId = req.body.postId;

        if (friendcode){
        const awaitPut = await User.findOneAndUpdate(
            { id: userId, 'friendIds.friendcode': friendcode }, 
            { $set: { 'friendIds.$.read': true } }
        );
    } else if (postId){
        const awaitPut = await User.findOneAndUpdate(
            { id: userId, 'recievedPostsIds.id': postId }, 
            { $set: { 'recievedPostsIds.$.read': true } }
        );
        }
        res.status(201).send({ message: "Post/Friend read status updated successfully in DB!" });
    } catch (error) {
        console.error("Error adding friend to DB", error);
        res.status(500).send({ message: "Error updating Post/Friend read status in DB" });
    }
}
);

module.exports = router;