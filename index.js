const express = require('express');
const server = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// template engine
server.set('view engine', 'ejs');
server.set('views', './views');

// body parser

// connect db
let url = 'mongodb://localhost:27017/demo-tag';
mongoose.connect(url);
mongoose.connection.once('open', () => console.log(`MongoDB connected!`));
server.use(bodyParser.urlencoded({ extended: true }));

const { POST_ROUTER } = require('./routes/post.router');

server.use('/post', POST_ROUTER);

const { TAG_ROUTER } = require('./routes/tag.router');

server.use('/tag', TAG_ROUTER);

const PORT = 3000;

server.get('/demo', (req,res) => res.json({message: 'Hello, World!'}));

server.listen(PORT, () => console.log(`Server is running at port ${PORT}`));