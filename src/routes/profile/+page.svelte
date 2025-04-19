<script>
	let gender = '',
		age = '',
		line = '',
		province = '',
		details = '';
	let imageFile;

	export let data;
	let user = data.user;
	let posts = data.posts; // ✅ ต้องมีบรรทัดนี้

	console.log(posts);

	let provinces = [
		'กรุงเทพมหานคร',
		'เชียงใหม่',
		'ภูเก็ต',
		'ขอนแก่น',
		'นครราชสีมา',
		'ชลบุรี',
		'สุราษฎร์ธานี'
		// เพิ่มจังหวัดอื่นๆ ได้
	];

	async function post() {
		const formData = new FormData();
		formData.append('gender', gender);
		formData.append('age', age);
		formData.append('line', line);
		formData.append('province', province);
		formData.append('details', details);
		formData.append('image', imageFile);
		formData.append('userId', user.id);

		const res = await fetch('/api/posts/create', {
			method: 'POST',
			body: formData
		});

		const data = await res.json();
		if (res.ok) {
			alert('โพสต์แล้ว');

			// เพิ่มโพสต์ใหม่ลงใน posts
			const newPost = {
				gender,
				age,
				line,
				province,
				description: details,
				imageUrl: `/uploads/${Date.now()}-${imageFile.name}`, // ใส่ path รูปภาพที่เพิ่งอัปโหลด
				_id: data._id, // ถ้า API ส่ง _id กลับมา
				userId: user._id, // userId กรณีที่ต้องการแสดงผู้ใช้
				createdAt: new Date()
			};

			posts = [newPost, ...posts]; // เพิ่มโพสต์ใหม่ลงไปใน posts array ที่มีอยู่

			// เคลียร์ฟอร์ม
			gender = '';
			age = '';
			line = '';
			province = '';
			details = '';
			imageFile = null;
		} else {
			const err = await res.json();
			alert(data.error || 'เกิดข้อผิดพลาด');
		}
	}
</script>

<div class="profile-container">
	<!-- ซ้าย -->
	<div class="left-panel">
		<!-- Profile Section -->
		<div class="profile-header">
			<h1>โปรไฟล์ของ {user.username}</h1>
			<p>ยินดีต้อนรับเข้าสู่โปรไฟล์ส่วนตัวของคุณ</p>
		</div>

		<!-- Form for Posting -->
		<section class="form-container">
			<h2>สร้างโพสต์ใหม่</h2>
			<form on:submit|preventDefault={post}>
				<label>เพศ</label>
				<select bind:value={gender} required>
					<option value="" disabled selected>เลือกเพศ</option>
					<option value="ชาย">ชาย</option>
					<option value="หญิง">หญิง</option>
				</select>

				<label>อายุ</label>
				<input type="number" bind:value={age} placeholder="เช่น 25" required />

				<label>ไลน์</label>
				<input bind:value={line} placeholder="ID Line" required />

				<label>จังหวัด</label>
				<select bind:value={province} required>
					<option value="">เลือกจังหวัด</option>
					{#each provinces as p}
						<option>{p}</option>
					{/each}
				</select>

				<label>รายละเอียด</label>
				<textarea bind:value={details} rows="4" required></textarea>

				<label>อัปโหลดรูปภาพ</label>
				<input
					type="file"
					on:change={(e) => (imageFile = e.target.files[0])}
					accept="image/*"
					required
				/>

				<button type="submit">โพสต์</button>
			</form>
		</section>
	</div>

	<!-- ขวา  -->
	<section class="posts-container">
		<h2>โพสต์ของคุณ</h2>
		{#if posts.length > 0}
			{#each posts as post}
				<div class="post-item">
					<img src={post.imageUrl} alt="โพสต์รูป" />
					<p><strong>เพศ:</strong> {post.gender}</p>
					<p><strong>อายุ:</strong> {post.age}</p>
					<p><strong>ไลน์:</strong> {post.line}</p>
					<p><strong>จังหวัด:</strong> {post.province}</p>
					<p><strong>รายละเอียด:</strong> {post.description}</p>
				</div>
			{/each}
		{:else}
			<p>ยังไม่มีโพสต์</p>
		{/if}
	</section>
</div>

<style>
	.profile-container {
		display: grid;
		grid-template-columns: 1fr 1fr; /* แบ่ง 2 คอลัมน์ */
		gap: 20px;
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	.left-panel {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.profile-header {
		text-align: center;
		background-color: #f0f0f0;
		padding: 20px;
		border-radius: 8px;
	}

	.form-container,
	.posts-container {
		background-color: #fafafa;
		padding: 20px;
		border-radius: 8px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.posts-container {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); /* ภายในโพสต์ เป็นหลายคอลัมน์ */
		gap: 16px;
	}

	.post-item {
		padding: 10px;
		background-color: #f9f9f9;
		border-radius: 6px;
		box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
	}

	.post-item img {
		max-width: 100%;
		height: auto;
		border-radius: 4px;
	}

	label {
		display: block;
		margin-top: 12px;
		font-weight: bold;
	}

	input,
	select,
	textarea {
		width: 100%;
		padding: 10px;
		margin-top: 6px;
		border-radius: 4px;
		border: 1px solid #ccc;
		box-sizing: border-box;
	}

	button {
		margin-top: 20px;
		width: 100%;
		padding: 12px;
		background-color: #0077cc;
		color: white;
		border: none;
		border-radius: 4px;
		font-weight: bold;
		cursor: pointer;
	}

	button:hover {
		background-color: #005fa3;
	}
</style>
