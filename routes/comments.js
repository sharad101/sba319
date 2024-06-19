import express from "express";
import db from "../db/conn.js";
import { ObjectId } from "mongodb";
import { route } from "../../SBA318/routes/users.js";
import Comments from '../models/comment'


const router = express.Router();



// Get all comments for a post
router.get('/post/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ postId: req.params.postId }).populate('commenter', 'username');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a comment
router.post('/', async (req, res) => {
    const comment = new Comment({
        postId: req.body.postId,
        commenter: req.body.commenter,
        commentText: req.body.commentText
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a comment
router.delete('/:id', async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);
        if (comment == null) {
            return res.status(404).json({ message: 'Cannot find comment' });
        }

        await comment.remove();
        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
