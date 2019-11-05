const express = require('express');
const cors = require('cors');

const app = express();

const port = 1500;

app.use(cors());

app.use(express.urlencoded({
    extended: false
}));

app.use(express.json());

// Routers
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const likesRouter = require('./routes/likesRouter');
app.use('/users', userRouter);
app.use('/posts', postRouter);
app.use('/likes', likesRouter);

app.get('/', (req, res) => {
    res.send(`Welcome to my social media page`);
});


app.listen(port, () => {
    console.log(`server running at http://localhost:${port}`);
});