import { Post } from '$lib/server/models/Post'; // เพิ่มการ import Post ที่นี่

export async function load({ params }) {
  const { id } = params;

  try {
    // ดึงข้อมูลโพสต์จากฐานข้อมูล
    const post = await Post.findById(id).lean();

    if (!post) {
      throw new Error('โพสต์ไม่พบ');
    }

    // แปลง _id และ userId เป็น string
    const postWithStringIds = {
      ...post,
      _id: post._id.toString(), // แปลง _id เป็น string
      userId: post.userId.toString() // แปลง userId เป็น string
    };

    return {
      post: postWithStringIds // ส่งข้อมูลที่แปลงแล้ว
    };
  } catch (err) {
    console.error(err);
    return {
      post: null
    };
  }
}
