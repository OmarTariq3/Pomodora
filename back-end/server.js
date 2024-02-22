const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/Posts');

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Replace with the actual origin of your React application
    optionsSuccessStatus: 200, // Some legacy browsers (IE11, various SmartTVs) choke on 204
}));
app.use(express.json());

// MongoDB Schema
const { Schema } = mongoose;
const PostSchema = new Schema({
    author: String,
    title: String,
    content: String,
});

// MongoDB Model
const Post = mongoose.model('Post', PostSchema);

// Routes
app.route('/xxx')
    .get(async (req, res) => {
        try {
            const posts = await Post.find({});
            res.status(200).json({ message: 'Posts were fetched successfully', data: posts }); //Responing to the client request with a message and an array of posts
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    })
    .post(async (req, res) => {
        try {
            const postFromFront = req.body;
            const newPost = new Post(postFromFront);
            await newPost.save();

            res.status(201).json({ message: 'Post created successfully' });
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    });

// Server start
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
