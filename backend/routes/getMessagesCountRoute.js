const express = require('express');
const router = express.Router();
const User = require('../models/userSchema'); // Pfad zu Ihrem User-Modell

router.get("/", async (req, res) => {
    try {
        // extract User-ID from Token
        const userId = req.headers['decoded-token'];
        console.log("userId:", userId);

        // search for User in DB
        const user = await User.findOne({id: userId});
        if (!user){
            return res.status(404).json({ message: "User not found" });
        }

        // get MessagesCount from User
        const messagesCount = user.messagesCount;
        console.log("messagesCount:", messagesCount);

        res.status(200).json({ messagesCount: messagesCount });
        console.log("messagesCount sent!");
    } catch (error) {
        console.error("Error while getting messagesCount from DB!", error);
        res.status(500).send({message: "Error while getting messagesCount from DB!"});
    }
});

module.exports = router;