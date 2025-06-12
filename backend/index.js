require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");

mongoose.connect(config.connectionString);

//Import all models here...
const User = require("./models/user.model");
const Note = require("./models/note.model");

const express = require("express");
const cors = require("cors");
const app = express();

const jwt = require("jsonwebtoken");
const { authenticationToken } = require("./utilities");

app.use(express.json());


app.use(
    cors({
        origin: "*",
    })
);

//Home (or) root page
// app.get("/", (req, res) => {
//     res.render();
// });

//Creating a User
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;
    if(!fullName) {
        return res
            .status(400)
            .json({ error: true, message: "Full Name is required" });
    }
    if(!email) {
        return res
            .status(400)
            .json({ error: true, message: "Email is required" });
    }
    if(!password) {
        return res
            .status(400)
            .json({ error: true, message: "password is required" });
    }
    const isUser = await User.findOne({ email: email });
    if(isUser) {
        return res.json({
            error: true,
            message: "User already exists",
        });
    }
    const user = new User({
        fullName,
        email,
        password,
    });
    await user.save();
    const accessToken = jwt.sign(
        { user }, 
        process.env.ACCESS_TOKEN_SECRET, 
        { expiresIn: "36000m", }
    );
    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    })
});

//User Authentication(login)
app.post("/login", async (req, res) => {
    const { email, password } = req.body;
    if(!email) {
        return res.status(400).json({ message: "Email is required" });
    }
    if(!password) {
        return res.status(400).json({ message: "Password is required" });
    }
    const userInfo = await User.findOne({ email: email });
    if(!userInfo) {
        return res.status(400).json({ message: "User not found" });
    }
    if(userInfo.email === email && userInfo.password === password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "36000m",
        });
        return res.json({ 
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    } else {
        return res.status(400).json({ 
            error: true,
            message: "Invalid Credentials",
        })
    }
});

//Get User
app.get("/get-user", authenticationToken, async (req, res) => {
    const { user } = req.user;
    const isUser = await User.findOne({ _id: user._id });
    if(!isUser) {
        return res.sendStatus(401);
    }
    return res.json({
        user: { 
            fullName: isUser.fullName, 
            email: isUser.email, 
            "_id": isUser._id, 
            createdOn: isUser.createdOn,
        },
        message: "",
    })
});

//Adding new Note
app.post("/add-note", authenticationToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;
    if(!title) {
        return res.status(400).json({error: true, message: "Title is required" });
    }
    if(!content) {
        return res.status(400).json({ error: true, message: "Content is necessary" });
    }
    try {
        const notes = new Note({
            title, 
            content, 
            tags: tags || [], 
            userId: user._id,
        });
        await notes.save();
        return res.json({
            error: false,
            notes,
            message: "Note added successfully",
        });
    } catch(error) {
        return res.status(500).json({
            error: true,
            message: "Server Error",
        });
    }
});

//Editing the Notes
app.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;
    // console.log(req.body);
    if(!title && !content && !tags) {
        console.log("No changes in the request body:", req.body);
        return res
            .status(400)
            .json({
                error: true,
                message: "No changes provided"
            });
    }

    try {
        const notes = await Note.findOne({ _id: noteId, userId: user._id });
        if(!notes) return res.status(404).json({ error: true, message: "Note not found" });
        if(title) notes.title = title;
        if(content) notes.content = content;
        if(tags) notes.tags = tags;
        if(isPinned) notes.isPinned = isPinned;
        await notes.save();
        return res.json({ 
            error: false, 
            notes,
            message: "Note edited"
        });
    } catch (error) {
        return res
            .status(500)
            .json({
                error: true,
                message: "Server Error"
            });
    }
});

//Get all Notes
app.get("/get-all-notes", authenticationToken, async (req, res) => {
    //console.log("User in request:", req.user); // Log the user from the token
    const { user } = req.user;
    try {
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
        return res.json({ error: false, notes, message: "All notes retrieved" });
    } catch(error) {
        console.error("Error fetching notes:", error); // Log error details
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

//Delete Note
app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;
    try {
        const notes = await Note.findOne({ _id: noteId, userId: user._id });
        if(!notes) return res.status(404).json({error: true, message: "Note not found"});
        await Note.deleteOne({ _id: noteId, userId: user._id });
        return res.json({ error: false, message: "Note deleted successfully"});
    } catch(error) {
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

//Update isPinned Value
app.put("/update-note-pinned/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;
    //console.log(req.body);
    try {
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if(!note) return res.status(404).json({ error: true, message: "Note not found" });
        note.isPinned = isPinned;
        await note.save();
        return res.json({ 
            error: false, 
            note,
            message: "Note pin updated"
        });
    } catch (error) {
        return res
            .status(500)
            .json({
                error: true,
                message: "Server Error"
            });
    }
});

//Search Notes
app.get("/search-notes/", authenticationToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;
    if(!query) {
        return res
            .status(400)
            .json({
                error: true,
                message: "Query is required"
            });
    }
    try {
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } }
            ],
        });
        return res.json({
            error: false,
            notes: matchingNotes,
            message: "Matching Notes found !"
        });
    } catch(error) {
        return res.status(500).json({error: true, message: "Server Error"});
    }

})

app.listen(8080);

module.exports = app;