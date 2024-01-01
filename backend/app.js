require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");


// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectionString = process.env.MONGO_DB_CLIENT;
console.log("Connecting to MongoDB...");

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    }).then(() => {
    console.log("MongoDB connected successfully!");
    }).catch((err) => {
    console.error("Error connecting to MongoDB", err);
    }
);
// Schemas ----------------------------------------------
// Schema for Post

const Post = require("./models/postSchema");

// Routes ----------------------------------------------
// Post Route for Post

app.post("/api/post", async (req, res) => {
    try {
        const post = req.body;
        console.log(post);
        const awaitPost = await Post.create(post);
        res.status(201).send({message: "Post added successfully to DB!"});
    } catch (error) {
        console.error("Error adding post to DB", error);
        res.status(500).send({message: "Error adding post to DB"});
    }
});



app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    });

app.get("/health-check", (req, res) => {
    res.status(200).send({message:"I'm alive! Greetings from the backend!"});
    });