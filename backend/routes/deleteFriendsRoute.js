const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.put("/", async (req, res) => {
    try {
        const userId = req.body.userId;
        const friendCodeToDelete = req.body.friendcodeToDelete;

    
    if (!userId || !friendCodeToDelete) {
        return res.status(400).send({ message: "Something went wrong!" });
    }

    const awaitDelete = await User.findOneAndUpdate(
        { id: userId }, 
        { $pull: { friendIds: { friendcode: friendCodeToDelete } } }
      );    res.status(201).send({ message: "Friend deleted successfully from DB!" });
    }
    catch (error) {
        console.error("Error deleting friend from DB", error);
        res.status(500).send({ message: "Error deleting friend from DB" });
    }
}
);

module.exports = router;