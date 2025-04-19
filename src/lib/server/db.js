import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // ✅ โหลดไฟล์ .env

const uri = process.env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
};
