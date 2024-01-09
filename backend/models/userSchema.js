const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    id: {
      type: String,
      required: true,
      index: true,
    },
    avatarUrl: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 50,
    },
    username: {
      type: String,
      required: true,
      minlength: 3,
      maxlength: 20,
    },
    hashedPassword: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 60,
    },
    friendcode: {
      type: String,
      required: false,
    },
    recievedPostsIds: {
      type: Array,
      default: [],
    },
    friendIds: {
        type: Array,
        default: [],
      },
    userSettings: {
        type: Array,
        default: [{theme: "sunriseSunset-theme"}, {notificationTime: "19:00"}],
    },
  });
  
  const User = mongoose.model("UserCollection", userSchema); //"UserCollection" ist the name of the collection in the database

  module.exports = User;