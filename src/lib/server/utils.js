import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { User } from './models/User';
import { connectDB } from './db';

export const getUserFromToken = async (request) => {
  await connectDB();
  const cookies = cookie.parse(request.headers.get('cookie') || '');
  try {
    const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
    return await User.findById(decoded.id);
  } catch (e) {
    return null;
  }
};
