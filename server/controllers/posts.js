import mongoose from 'mongoose';
import PostMessage from '../models/postMessage.js';

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();

        res.status(200).json(postMessages);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;

    try {
        const newPost = new PostMessage(post);

        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({
            message: error.message
        });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post found with ID: ${_id}`);

    try {
        const updatedPost = await PostMessage.findByIdAndUpdate(_id, post, {
            new: true
        });

        res.json(updatedPost);
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id))
        return res.status(404).send(`No post found with ID: ${id}`);

    try {
        await PostMessage.findByIdAndDelete(id);

        res.json({
            message: 'Post deleted successfully'
        });
    } catch (error) {
        res.status(404).json({
            message: error.message
        });
    }
};
