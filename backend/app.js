require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;

app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    });

app.get("/health-check", (req, res) => {
    res.status(200).send({message:"I'm alive! Greetings from the backend!"});
    });