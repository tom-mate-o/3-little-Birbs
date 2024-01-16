require("dotenv").config();

const express = require("express");
const app = express();
const port = process.env.PORT;
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
const connectionString = process.env.MONGO_DB_CLIENT;
console.log("Connecting to MongoDB...");

mongoose
  .connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB", err);
  });
// Schemas ----------------------------------------------
// Schema for Post

const Post = require("./models/postSchema");

// Schema for User

const User = require("./models/userSchema");

// Routes ----------------------------------------------
// POST Route for Post

const postRoute = require("./routes/postRoute"); // Pfad zur Post-Route
app.use("/api/post", postRoute);

// POST Route for Register
// ...down below because of (Multipart Form Data/Multer)

// GET Route for Posts aus Pool
const getPoolRoute = require("./routes/getPoolRoute"); // Pfad zur Get-Route
app.use("/api/getPool", getPoolRoute);

// POST Route for Login
const userController = require("./controller/userController");
app.post("/api/login", userController.login);

// GET Route for FriendIDs aus Userdata
const getFriendsRoute = require("./routes/getFriendsRoute"); // Pfad zur Get-Route
app.use("/api/getFriends", getFriendsRoute);

// PUT Route um FriendIDs in Userdata zu speichern
const putFriendsRoute = require("./routes/putFriendsRoute"); // Pfad zur Put-Route
app.use("/api/putFriends", putFriendsRoute);

// PUT Route um PostIDs in Userdata zu speichern
const putPostIdToUserRoute = require("./routes/putPostIdToUserRoute"); // Pfad zur Put-Route
app.use("/api/putPostIdToUser", putPostIdToUserRoute);

// POST Route um übereinstimmende Posts mit RecievedPostIDs aus Userdata zu finden
const getMatchingPostsMessagesRoute = require("./routes/getMatchingPostsMessagesRoute"); // Pfad zur Post-Route
app.use("/api/getMatchingPostsMessages", getMatchingPostsMessagesRoute);

// GET Post ID out from URL and find Post in Database
const getPostWithIdRoute = require("./routes/getPostWithIdRoute"); // Pfad zur Get-Route
app.use("/api/getPostWithId", getPostWithIdRoute);

// DELETE Route um FriendIDs in Userdata zu löschen
const deleteFriendsRoute = require("./routes/deleteFriendsRoute"); // Pfad zur Delete-Route
app.use("/api/deleteFriends", deleteFriendsRoute);

// GET Route um MessagesCount aus Userdata zu laden
const getMessagesCountRoute = require("./routes/getMessagesCountRoute"); // Pfad zur Get-Route
app.use("/api/getMessagesCount", getMessagesCountRoute);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

app.get("/health-check", (req, res) => {
  res.status(200).send({ message: "I'm alive! Greetings from the backend!" });
});

//--------------------------------------------------------------------------------
// Middleware - Multipart Form Data ----------------------------------------------
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const avatar = multer({ storage });

// Middleware für multipart formdata
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // Fügen Sie diese Zeile hier hinzu

// POST Route for Register ------------------------------------------------------

app.post("/api/register", avatar.single("avatar"), async (req, res) => {
  try {
    const { id, avatar, email1, username, password1, friendcode } = req.body;

    if (!id || !email1 || !username || !password1) {
      return res.status(400).send({ message: "Required field is missing!" });
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).send({ message: "Username already taken!" });
    }

    const existingEmail = await User.findOne({ email: email1 });
    if (existingEmail) {
      return res.status(422).send({ message: "Email already taken!" });
    }

    let avatarUrl = null;
    if (req.file) {
      avatarUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    console.log(avatarUrl);

    const hashedPassword = await bcrypt.hash(password1, 10);
    console.log(hashedPassword);

    const userToAdd = new User({
      id,
      avatarUrl,
      email: email1,
      username,
      hashedPassword,
      friendcode,
    });

    console.log(userToAdd);

    const userCreated = await User.create(userToAdd);
    console.log("userCreated");
    res.status(201).send({ message: "User created successfully!" });
  } catch (error) {
    console.error("Error while creating User!", error);
    res.status(500).send({ message: "Error while creating User!" });
  }
});

// PUT Route for Userdata Update ------------------------------------------------------
app.put("/api/updateUser", avatar.single("newAvatar"), async (req, res) => {
  try {
    const newUsername = req.body.newUsername;
    const newPassword = req.body.newPassword;
    const theme = req.body.theme;
    const notificationTime = req.body.notificationTime;
    const userId = req.body.userId;

    let newAvatarUrl = null;
    if (req.file) {
      newAvatarUrl = `${req.protocol}://${req.get("host")}/uploads/${
        req.file.filename
      }`;
    }
    

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    console.log(newHashedPassword);

    let updateObj = {};

    if (newUsername) {
      if (newUsername.length < 3 || newUsername.length > 20) {
        return res.status(401).send({ message: "Username must be between 3 and 20 characters!" });
      }
      updateObj.username = newUsername;
    }

    if (newPassword) {
      const passwordPattern = new RegExp("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}");
      if (!passwordPattern.test(newPassword)) {
        return res.status(400).send({ message: "Password does not meet the requirements!" });
      }
      const newHashedPassword = await bcrypt.hash(newPassword, 10);
      updateObj.hashedPassword = newHashedPassword;
    }

    if (newAvatarUrl) {
      updateObj.avatarUrl = newAvatarUrl;
    }

    if (theme && theme !== "0") {
      updateObj["userSettings.0.theme"] = theme;
    }

    if (notificationTime) {
      updateObj["userSettings.1.notificationTime"] = notificationTime;
    }

    const existingUser = await User.findOne({ username: newUsername });
  if (existingUser) {
    return res.status(409).send({ message: "Username already taken!" });
  }

    const updatedUser = await User.findOneAndUpdate({ id: userId }, updateObj, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found!" });
    }

    


    res
      .status(201)
      .send({ message: "User updated successfully!", user: updatedUser });
  } catch (error) {
    console.error("Error updating user", error);
    res.status(500).send({ message: "Error updating user" });
  }
});

// GET Route for Userdata ------------------------------------------------------
app.get("/api/getuserdata", async (req, res) => {
  try {
    const getUserData = await User.find({});
    console.log("Userdata loaded!");
    res.status(200).send({ message: getUserData, data: getUserData });
  } catch {
    res.status(500).send({ message: "Error while loading Userdata!" });
  }
});
