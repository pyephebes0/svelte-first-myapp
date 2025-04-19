import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { json } from '@sveltejs/kit';
import { User } from '$lib/server/models/User';
import { connectDB } from '$lib/server/db';

export async function POST({ request, cookies }) {
  await connectDB();

  const { username, password, email } = await request.json();

  // ตรวจสอบว่ามีข้อมูลครบไหม
  if (!username || !password || !email) {
    return json({ error: 'All fields are required' }, { status: 400 });
  }

  // เช็คว่า username ซ้ำไหม
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return json({ error: 'Username is already taken' }, { status: 400 });
  }

  // เก็บรหัสผ่านแบบ hash
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User({
    username,
    password: hashedPassword,
    email
  });

  await newUser.save();

  // สร้าง JWT token
  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  // เก็บ token ลงใน cookies
  cookies.set('token', token, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7 // token ใช้งานได้ 7 วัน
  });

  return json({ message: 'User registered successfully' });
}