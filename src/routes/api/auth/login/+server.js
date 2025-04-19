import { json } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { connectDB } from '$lib/server/db';
import { User } from '$lib/server/models/User';

export async function POST({ request, cookies }) {
  await connectDB();

  const body = await request.json();
  const { username, password } = body;

  if (!username || !password) {
    return json({ error: 'Username and password are required' }, { status: 400 });
  }

  const user = await User.findOne({ username });

  if (!user || !user.password) {
    return json({ error: 'User not found or has no password' }, { status: 404 });
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return json({ error: 'Invalid password' }, { status: 401 });
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  cookies.set('token', token, {
    path: '/',
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7
  });

  return json({ message: 'Login success' });
}
