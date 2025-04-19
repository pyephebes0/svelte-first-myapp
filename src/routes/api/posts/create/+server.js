import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/server/db';
import { Post } from '$lib/server/models/Post';
import { getUserFromToken } from '$lib/server/utils';

export async function POST({ request }) {
  await connectDB();
  const user = await getUserFromToken(request);
  if (!user) return new Response('Unauthorized', { status: 401 });
  const body = await request.json();
  const post = new Post({ ...body, userId: user._id });
  await post.save();
  return json({ success: true });
}
