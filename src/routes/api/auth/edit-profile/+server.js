import { json } from '@sveltejs/kit';
import { connectDB } from '$lib/server/db';
import { User } from '$lib/server/models/User';
import { getUserFromToken } from '$lib/server/utils';
import bcrypt from 'bcryptjs';

export async function POST({ request }) {
	try {
		await connectDB();
		const user = await getUserFromToken(request);
		if (!user) {
			return json({ message: 'Unauthorized' }, { status: 401 });
		}

		const { email, password } = await request.json();

		const updateData = { email };

		// ถ้ามีการส่ง password ใหม่มาด้วย
		if (password && password.trim() !== '') {
			const hashedPassword = await bcrypt.hash(password, 10);
			updateData.password = hashedPassword;
		}

		await User.findByIdAndUpdate(user._id, updateData);

		return json({ success: true });
	} catch (err) {
		console.error('update-profile error:', err);
		return json({ message: 'เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์' }, { status: 500 });
	}
}
