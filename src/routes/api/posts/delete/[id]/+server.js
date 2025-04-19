import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/server/db';
import { Post } from '$lib/server/models/Post';
import { getUserFromToken } from '$lib/server/utils';

export async function DELETE({ params, request }) {
  await connectDB();
  const user = await getUserFromToken(request);
  if (!user) return json({ message: 'Unauthorized' }, { status: 401 });

  const postId = params.id;
  const deleted = await Post.findOneAndDelete({ _id: postId, userId: user._id });

  if (!deleted) {
    return json({ message: 'ไม่พบโพสต์หรือคุณไม่มีสิทธิ์ลบ' }, { status: 403 });
  }

  return json({ success: true });
}
