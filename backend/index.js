require("dotenv").config(); // Load environment variables from a .env file

const config = require("./config.json"); // Load configuration details (e.g., connection strings)
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions

mongoose.connect(config.connectionString); // Connect to MongoDB using the connection string

// Import all models
const User = require("./models/user.model"); // User model
const Note = require("./models/note.model"); // Note model

const express = require("express"); // Import Express for creating the server
const cors = require("cors"); // Import CORS middleware to handle cross-origin requests
const app = express(); // Initialize Express app

const jwt = require("jsonwebtoken"); // Import JWT for token-based authentication
const { authenticationToken } = require("./utilities"); // Import middleware for token validation

app.use(express.json()); // Middleware to parse incoming JSON data
app.use(
    cors({
        origin: "*", // Allow requests from all origins
    })
);

// Root route
app.get("/", (req, res) => {
    res.json({ data: "hello" }); // Respond with a simple message
});

// User registration route
app.post("/create-account", async (req, res) => {
    const { fullName, email, password } = req.body;

    // Validate required fields
    if (!fullName) return res.status(400).json({ error: true, message: "Full Name is required" });
    if (!email) return res.status(400).json({ error: true, message: "Email is required" });
    if (!password) return res.status(400).json({ error: true, message: "Password is required" });

    // Check if a user with the same email already exists
    const isUser = await User.findOne({ email: email });
    if (isUser) {
        return res.json({ error: true, message: "User already exists" });
    }

    // Create and save a new user
    const user = new User({ fullName, email, password });
    await user.save();

    // Generate a JWT access token
    const accessToken = jwt.sign(
        { user },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "36000m" } // Set token expiry time
    );

    // Respond with the created user details and token
    return res.json({
        error: false,
        user,
        accessToken,
        message: "Registration Successful",
    });
});

// User login route
app.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Validate required fields
    if (!email) return res.status(400).json({ message: "Email is required" });
    if (!password) return res.status(400).json({ message: "Password is required" });

    // Check if the user exists
    const userInfo = await User.findOne({ email: email });
    if (!userInfo) return res.status(400).json({ message: "User not found" });

    // Validate credentials and generate a token
    if (userInfo.email === email && userInfo.password === password) {
        const user = { user: userInfo };
        const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "36000m" });
        return res.json({
            error: false,
            message: "Login Successful",
            email,
            accessToken,
        });
    } else {
        return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }
});

// Get user details route
app.get("/get-user", authenticationToken, async (req, res) => {
    const { user } = req.user;

    // Find the user by ID
    const isUser = await User.findOne({ _id: user._id });
    if (!isUser) return res.sendStatus(401); // Unauthorized if user not found

    // Respond with user details
    return res.json({
        user: {
            fullName: isUser.fullName,
            email: isUser.email,
            "_id": isUser._id,
            createdOn: isUser.createdOn,
        },
        message: "",
    });
});

// Add a new note route
app.post("/add-note", authenticationToken, async (req, res) => {
    const { title, content, tags } = req.body;
    const { user } = req.user;

    // Validate required fields
    if (!title) return res.status(400).json({ error: true, message: "Title is required" });
    if (!content) return res.status(400).json({ error: true, message: "Content is necessary" });

    // Create and save the note
    try {
        const notes = new Note({
            title,
            content,
            tags: tags || [],
            userId: user._id,
        });
        await notes.save();

        // Respond with the created note
        return res.json({
            error: false,
            notes,
            message: "Note added successfully",
        });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

// Edit a note route
app.put("/edit-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { title, content, tags, isPinned } = req.body;
    const { user } = req.user;

    // Ensure at least one field is provided for update
    if (!title && !content && !tags) {
        return res.status(400).json({ error: true, message: "No changes provided" });
    }

    try {
        // Find and update the note
        const notes = await Note.findOne({ _id: noteId, userId: user._id });
        if (!notes) return res.status(404).json({ error: true, message: "Note not found" });

        if (title) notes.title = title;
        if (content) notes.content = content;
        if (tags) notes.tags = tags;
        if (isPinned !== undefined) notes.isPinned = isPinned;

        await notes.save();

        // Respond with the updated note
        return res.json({ error: false, notes, message: "Note edited" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

// Retrieve all notes route
app.get("/get-all-notes", authenticationToken, async (req, res) => {
    const { user } = req.user;

    try {
        // Fetch and sort notes by isPinned
        const notes = await Note.find({ userId: user._id }).sort({ isPinned: -1 });
        return res.json({ error: false, notes, message: "All notes retrieved" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

// Delete a note route
app.delete("/delete-note/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { user } = req.user;

    try {
        // Find and delete the note
        const notes = await Note.findOne({ _id: noteId, userId: user._id });
        if (!notes) return res.status(404).json({ error: true, message: "Note not found" });

        await Note.deleteOne({ _id: noteId, userId: user._id });
        return res.json({ error: false, message: "Note deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

// Update the pinned status of a note route
app.put("/update-note-pinned/:noteId", authenticationToken, async (req, res) => {
    const noteId = req.params.noteId;
    const { isPinned } = req.body;
    const { user } = req.user;

    try {
        // Find and update the pinned status
        const note = await Note.findOne({ _id: noteId, userId: user._id });
        if (!note) return res.status(404).json({ error: true, message: "Note not found" });

        note.isPinned = isPinned;
        await note.save();

        return res.json({ error: false, note, message: "Note pin updated" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

// Search notes route
app.get("/search-notes/", authenticationToken, async (req, res) => {
    const { user } = req.user;
    const { query } = req.query;

    if (!query) return res.status(400).json({ error: true, message: "Query is required" });

    try {
        // Find notes matching the query
        const matchingNotes = await Note.find({
            userId: user._id,
            $or: [
                { title: { $regex: new RegExp(query, "i") } },
                { content: { $regex: new RegExp(query, "i") } },
            ],
        });

        return res.json({ error: false, notes: matchingNotes, message: "Matching Notes found!" });
    } catch (error) {
        return res.status(500).json({ error: true, message: "Server Error" });
    }
});

// Start the server
app.listen(8080);

// Export the app for testing or further use
module.exports = app;
