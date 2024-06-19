import express from "express"
import dotenv from 'dotenv';
import mongoose from'mongoose';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');
const commentsRouter = require('./routes/comments');

// inits the dotenv package
dotenv.config();


const app = express();

// App port
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/movie-reviews', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', (error) => console.error(error));
db.once('open', () => console.log('Connected to Database'));

app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/posts', postsRouter);
app.use('/comments', commentsRouter);

// Global error handler middleware
app.use((err, _req, res, next) => {
    res.status(500).send('Server Error!');
});



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
