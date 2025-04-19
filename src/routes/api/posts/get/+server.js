import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/server/db';
import Post from '$lib/server/models/Post';

export async function GET({ url }) {
  await connectDB();

  const search = url.searchParams.get('search') || '';
  const query = search
    ? {
        $or: [
          { province: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } }
        ]
      }
    : {};

  const posts = await Post.find(query).sort({ createdAt: -1 });

  return json(posts);
}
