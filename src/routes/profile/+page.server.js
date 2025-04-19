import { redirect } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';
import { connectDB } from '$lib/server/db';
import { User } from '$lib/server/models/User';

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

    return {
      user: {
        id: user._id.toString(),
        username: user.username
      }
    };
  } catch (err) {
    throw redirect(303, '/login');
  }
}
