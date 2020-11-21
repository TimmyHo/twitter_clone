const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postText: {
    type: String,
    required: true
  }
});

postSchema.index({
  postText: 'text'
}, { background: false });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;