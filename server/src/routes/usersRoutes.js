const express = require('express');
const User = require('../models/user');
const Post = require('../models/post');
const Follow = require('../models/follow');

const router = express.Router();

router.get('/',  async (req, res) => {
  // Will eventually switch to pagination
  const allUsers = await User.find({}).limit(20);
  res.send({ users: allUsers });
});

router.get('/:userName/feed/me',  async (req, res) => {
  const user = await User.find({ userName: req.params.userName });

  if (!user) {
    return res.send({ posts: [] });
  }

  const posts = await Post.find({ author: user }).sort({ createdAt: -1 }).limit(20);
  res.send({ posts });
});

// get a list of all the users who the user is following
router.get('/:userName/following', async (req, res) => {
  const user = await User.find({ userName: req.params.userName });

  const followingList = await Follow.find({
    follower: user
  }).populate('following');

  const followingListObject = followingList.map((follow) => {
    const { following } = follow;
    return following;
  })

  res.send({ 
    follower: user, 
    followingCount: followingListObject.length,
    followingList: followingListObject
  });
});

// get a list of all the users who follow the user
router.get('/:userName/follower', async (req, res) => {
  const user = await User.find({ userName: req.params.userName });

  const followerList = await Follow.find({
    following: user
  }).populate('follower');

  const followerListObject = followerList.map((follow) => {
    const { follower } = follow;
    return follower;
  })

  res.send({ 
    following: user, 
    followerCount: followerListObject.length,
    followerList: followerListObject
  });
});

module.exports = router;