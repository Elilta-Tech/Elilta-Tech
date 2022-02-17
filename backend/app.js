const express = require('express');
const bodyParser = require('body-parser');
const post = require('./models/post');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post('/api/posts', (req, res, next) => {
  // const post = req.body;
  const newPost = new post({
    title: req.body.title,
    content: req.body.content
  })
  console.log(newPost);
  res.status(201).json('Post Added Successfully!!');
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    {
      id: 'asdsdsda8282',
      title: 'First Post',
      content: 'First post from server!'
    },
    {
      id: 'asdsd0292',
      title: 'Second Post',
      content: 'Second post from server!'
    },
  ];


  res.status(200).json({
    message: 'posts fetched successfully!!',
    posts: posts
  });
});


module.exports = app;
