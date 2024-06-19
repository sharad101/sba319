import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
import Post from '../models/post'

const router = express.Router();


// Get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('reviewer', 'username');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a post
router.post('/', async (req, res) => {
    const post = new Post({
        movieTitle: req.body.movieTitle,
        reviewText: req.body.reviewText,
        rating: req.body.rating,
        reviewer: req.body.reviewer
    });

    try {
        const newPost = await post.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get a single post
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('reviewer', 'username');
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a post
router.patch('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }

        if (req.body.movieTitle != null) {
            post.movieTitle = req.body.movieTitle;
        }
        if (req.body.reviewText != null) {
            post.reviewText = req.body.reviewText;
        }
        if (req.body.rating != null) {
            post.rating = req.body.rating;
        }

        const updatedPost = await post.save();
        res.json(updatedPost);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a post
router.delete('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post == null) {
            return res.status(404).json({ message: 'Cannot find post' });
        }

        await post.remove();
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;