const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');

const router = express.Router();

router.post('/',  async (req, res) => {
  const { userName, postText } = req.body;

  let user = await User.findOne({ userName });

  if (!user) {
    user = new User({
      userName
    });
    await user.save();
  }

  const post = new Post({
    author: user._id,
    postText
  });
  await post.save();

  res.send(post);
});

router.delete('/:post_id',  async (req, res) => {
  await Post.deleteOne({ _id: req.params.post_id });
  res.send({});
});

module.exports = router;