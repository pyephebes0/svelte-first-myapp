import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imageUrl: { type: String, required: true },
  gender: { type: String, enum: ['ชาย', 'หญิง'], required: true },
  age: Number,
  line: String,
  province: String,
  details: String,
  createdAt: { type: Date, default: Date.now }
});

export const Post = mongoose.models.Post || mongoose.model('Post', postSchema);

