const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id: String,
    date: String,
    public: Boolean,
    private: Boolean,
    poster: String,
    reciever: String,
    birb1: String,
    goodthing1: String,
    birb2: String,
    goodthing2: String,
    birb3: String,
    goodthing3: String,
    message: String,
    });

    const Post = mongoose.model("PostCollection", postSchema);

    module.exports = Post;