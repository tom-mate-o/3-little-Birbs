const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.put("/", async (req, res) => {
    try {
        const userId = req.body.userId;
        const friendIdToAdd = req.body.friendIdtoAdd;
        const friendCode = req.body.friendCode;

        // check if the format of the friendcode is correct
        if (friendIdToAdd.length !== 10) {
        return res.status(400).send({ message: "Friendcode is not valid!" });
        }

        // check if the user is trying to add himself
        console.log('userId:', userId);
        console.log('friendIdToAdd:', friendIdToAdd)
        if (friendCode === friendIdToAdd) {
        return res.status(410).send({ message: "You can't add yourself!" });
        }

        // check if there is an ID in the database that matches the ID from the request
        const awaitFind = await User.findOne({ friendcode: friendIdToAdd });
        console.log("friendIdToAdd:", friendIdToAdd);
        if (!awaitFind) {
            return res.status(404).send({ message: "User not found!" });
        }

        // check if the friend is already in the friendlist
        const awaitFindFriend = await User.findOne({ id: userId, friendIds: friendIdToAdd });
        if (awaitFindFriend) {
            return res.status(409).send({ message: "Friend already in friendlist!" });
        }





        const awaitPut = await User.findOneAndUpdate({ id: userId }, { $push: { friendIds: friendIdToAdd } });
        res.status(201).send({ message: "Friend added successfully to DB!" });
    } catch (error) {
        console.error("Error adding friend to DB", error);
        res.status(500).send({ message: "Error adding friend to DB" });
    }
}
);

module.exports = router;