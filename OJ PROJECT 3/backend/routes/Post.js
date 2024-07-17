const express = require("express");
const Post = require("../models/post");
const { authenticateToken } = require("../middlewares/auth");

const router = express.Router();

// Create a new post on web
router.post("/create", async (req, res) => {
    const { title, content } = req.body;
    const author = req.user.id;

    try {
        const newPost = new Post({ title, content, author });
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ error: "Error creating post" });
    }
});

// Fetch all the posts of the users
router.get("/all", async (req, res) => {
    try {
        const posts = await Post.find().populate("author", "username");
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error: "Error fetching posts" });
    }
});

module.exports = router;