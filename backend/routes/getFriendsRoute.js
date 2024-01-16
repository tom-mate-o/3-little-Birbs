const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Pfad zu Ihrem User-Modell

router.get("/", async (req, res) => {
    try {
        // extract User-ID from Token
        const userId = req.headers['decoded-token'];
    

        // search for User in DB
        const user = await User.findOne({id: userId});
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        // get Friend-IDs from User
        const friendIds = user.friendIds;

        // extract friendcodes from friendIds
        const friendcodes = friendIds.map(friend => friend.friendcode);
        
        // search the User for each Friend-ID
        const friends = await User.find({ "friendcode": { $in: friendcodes } });

        // get the Username for each Friend
        const friendUsernames = friends.map(friend => friend.username);

        // get the Avatar for each Friend
        const friendAvatars = friends.map(friend => friend.avatarUrl);

        // get the UserID for each Friend
        const friendcode = friends.map(friend => friend.friendcode);

        // send the Usernames + Avatars to the frontend
        res.status(200).json({ friendUsernames, friendAvatars, friendcode });
        console.log("Friend-Usernames sent!");
    } catch (error) {
        console.error("Error while getting Friends from DB!", error);
        res.status(500).send({message: "Error while getting Friends from DB!"});
    }
});

module.exports = router;