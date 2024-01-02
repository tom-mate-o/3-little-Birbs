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
// POST Route for Post

const postRoute = require('./routes/postRoute'); // Pfad zur Post-Route
app.use('/api/post', postRoute);

// GET Route for Posts aus Pool
const getPoolRoute = require('./routes/getPoolRoute'); // Pfad zur Get-Route
app.use('/api/getPool', getPoolRoute);



app.listen(port, () => {
    console.log(`listening at http://localhost:${port}`);
    });

app.get("/health-check", (req, res) => {
    res.status(200).send({message:"I'm alive! Greetings from the backend!"});
    });