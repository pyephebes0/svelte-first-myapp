import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { connectDB } from '$lib/server/db';
import { User } from '$lib/server/models/User';
import { Post } from '$lib/server/models/Post';

export async function load({ cookies }) {
  const token = cookies.get('token');

  if (!token) {
    throw redirect(303, '/login');
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();

    const user = await User.findById(decoded.id).lean();

    if (!user) {
      throw redirect(303, '/login');
    }

    // แปลง _id เป็น string
    const userId = user._id.toString();

    // ดึงโพสต์ของผู้ใช้จากฐานข้อมูล
    const posts = await Post.find({ userId }).sort({ createdAt: -1 }).lean();

    // แปลง userId ในโพสต์ให้เป็น string
    const postsWithStringUserId = posts.map(post => ({
      ...post,
      _id: post._id.toString(),  // แปลง _id ของโพสต์เป็น string
      userId: post.userId.toString() // แปลง userId ของโพสต์เป็น string
    }));


    return {
      user: {
        id: userId,
        username: user.username
      },
      posts: postsWithStringUserId, // ส่งโพสต์ที่มี _id เป็น string ไปยัง frontend
    };
  } catch (err) {
    throw redirect(303, '/login');
  }
}
