import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  imageUrl: String,
  gender: String,
  age: Number,
  line: String,
  province: String,
  description: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

