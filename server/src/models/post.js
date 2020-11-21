const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  postText: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;      
    }
  }
});

postSchema.index({
  postText: 'text'
}, { background: false });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;