const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

router.get('/',  async (req, res) => {
  // Will eventually switch to pagination
  const allUsers = await User.find({}).limit(20);
  res.send({ users: allUsers });
});

router.get('/:user_name/feed/me',  async (req, res) => {
  const user = await User.find({ userName: req.params.user_name });

  if (!user) {
    return res.send({ posts: [] });
  }

  const posts = await Post.find({ author: user }).sort({ createdAt: -1 }).limit(20);
  res.send({ posts });
});

module.exports = router;