const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    id: String,
    date: String,
    public: Boolean,
    private: Boolean,
    poster: String,
    posterID: String,
    reciever: String,
    birb1: String,
    goodthing1: 
    {type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
    },
    birb2: String,
    goodthing2: 
    {type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
    },
    birb3: String,
    goodthing3: 
    {type: String,
    required: true,
    minlength: 3,
    maxlength: 60,
    },
    message: 
    {type: String,
    required: true,
    minlength: 3,
    maxlength: 100,
    },
    });

    const Post = mongoose.model("PostCollection", postSchema);

    module.exports = Post;