const express = require('express');
const User = require('../models/user');
const Follow = require('../models/follow');

const router = express.Router();

router.post('/',  async (req, res) => {
  const { followerUserName, followingUserName } = req.body;

  let followerUser = await User.findOne({ userName: followerUserName });
  let followingUser = await User.findOne({ userName: followingUserName });
  
  if (!followerUser) {
    followerUser = new User({
      userName: followerUserName
    });
    await followerUser.save();
  }

  if (!followingUser) {
    followingUser = new User({
      userName: followingUserName
    });
    await followingUser.save();
  }

  let follow = await Follow.findOne({
    follower: followerUser,
    following: followingUser
  });
  
  if (!follow) {
    follow = new Follow({
      follower: followerUser,
      following: followingUser
    });

    await follow.save();
  }

  res.send(follow);
});

router.delete('/',  async (req, res) => {
  const { followerUserName, followingUserName } = req.body;

  let followerUser = await User.findOne({ userName: followerUserName });
  let followingUser = await User.findOne({ userName: followingUserName });
  
  if (followerUser && followingUser) {
    await Follow.deleteOne({
      follower: followerUser,
      following: followingUser
    });
  }

  res.send({});
});

module.exports = router;