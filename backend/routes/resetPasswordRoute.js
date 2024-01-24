require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    

    if (!email) {
      return res.status(401).send({ message: "Email field is missing!" });
    }
    try {
      const userExists = await User.findOne({ email: email });
      
      if (!userExists) {
        console.log("No user found with the provided email");
        return res.status(404).send({ message: "No User with this E-Mail" });
      }

      const code = Math.floor(100000 + Math.random() * 900000);
      

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "3 LITTLE BIRBS - Password Reset",
        html: `
        <h2>3 LITTLE BIRBS - Password Reset</h2>
        <p>Your password reset code is:</p>
        <div style="
            border: 2px solid black;
            border-radius: 15px;
            padding: 10px;
            display: inline-block;
            font-weight: bold;
            background-color: #f8f9fa;
        ">
            <h1>${code}</h1>
        </div>
    `,
};

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.log(err);
        } else {
            const token = jwt.sign({ email }, process.env.JWT_SECRET_KEY);
            const responseData = {
                code,
                token,
                message: "Password reset email sent successfully!"};
                res.status(200).send(responseData);
            };
        });
    } catch (error) {
      console.error("Error finding user", error);
      return res.status(400).send({ message: "Error while resetting Password" });
    }


  } catch (error) {
    console.error("Error sending resetting password email", error);
    res.status(500).send({ message: "Error sending resetting password email" });
  }
});

module.exports = router;
