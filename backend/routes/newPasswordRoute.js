require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

router.put("/", async (req, res) => {
  const password = req.body.password;
  const token = req.headers.authorization.split(" ")[1];
  const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  
  if (!password || ! token) {
    return res.status(401).send({ message: "Password or Token is missing!" });
  }

  try {
    const newHashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({email: decodedToken.email});
    const updateUser = await User.findOneAndUpdate({email: decodedToken.email}, {hashedPassword: newHashedPassword});
    res.status(200).send({message: "Password updated successfully"});
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Error while updating password!" });
  }
});

module.exports = router;
