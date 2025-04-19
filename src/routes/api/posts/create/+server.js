import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/server/db';
import { Post } from '$lib/server/models/Post';
import { getUserFromToken } from '$lib/server/utils';
import fs from 'fs';
import path from 'path';

export async function POST({ request }) {
  await connectDB();

  const user = await getUserFromToken(request);
  console.log('user จาก token:', user);

  if (!user) return json({ message: 'Unauthorized' }, { status: 401 });

  const form = await request.formData();
  const gender = form.get('gender');
  const age = form.get('age');
  const line = form.get('line');
  const province = form.get('province');
  const details = form.get('details');
  const image = form.get('image'); // file object

  if (!image || !image.name) {
    return json({ message: 'รูปภาพหายไป' }, { status: 400 });
  }

  // สร้าง path เก็บไฟล์ใน /static/uploads
  const uploadDir = 'static/uploads';
  const fileName = `${Date.now()}-${image.name}`;
  const filePath = path.join(uploadDir, fileName);
  const buffer = Buffer.from(await image.arrayBuffer());

  // สร้างโฟลเดอร์ถ้ายังไม่มี
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(filePath, buffer);

  const post = new Post({
    gender,
    age,
    line,
    province,
    details,
    imageUrl: `/uploads/${fileName}`,
    userId: user._id
  });

  console.log('โพสต์ใหม่:', post);
  await post.save();
  return json({ success: true });
}
