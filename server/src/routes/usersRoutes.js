const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/',  async (req, res) => {
  // Will eventually switch to pagination
  const allUsers = await User.find({}).select('-_id -__v').limit(20);
  res.send({ users: allUsers });
});

module.exports = router;