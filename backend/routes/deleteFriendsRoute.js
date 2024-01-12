const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');

router.put("/", async (req, res) => {
    try {
        const userId = req.body.userId;
        const friendCodeToDelte = req.body.friendcodeToDelete;
        console.log("userId:", userId);
        console.log("friendCodeToDelte:", friendCodeToDelte);
    
    if (!userId || !friendCodeToDelte) {
        return res.status(400).send({ message: "Something went wrong!" });
    }

    const awaitDelte = await User.findOneAndUpdate({ id: userId }, { $pull: { friendIds: friendCodeToDelte } });
    res.status(201).send({ message: "Friend deleted successfully from DB!" });
    }
    catch (error) {
        console.error("Error deleting friend from DB", error);
        res.status(500).send({ message: "Error deleting friend from DB" });
    }
}
);

module.exports = router;