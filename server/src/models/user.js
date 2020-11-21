const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true
  },
  imageUrl: {
    type: String,
    // Unown for an unknown user
    default: 'https://www.serebii.net/pokemon/art/201.png'
  }
}, {
  timestamps: false,
  toJSON: {
    transform(doc, ret) {
      delete ret._id;
      delete ret.__v;      
    }
  }
});

userSchema.index({
  userName: 'text'
}, { background: false });

const User = mongoose.model('User', userSchema);

module.exports = User;