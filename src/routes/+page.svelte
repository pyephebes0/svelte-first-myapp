<script>
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let posts = [];
	let keyword = '';

	async function search() {
		const res = await fetch('/api/posts/get?search=' + keyword);
		posts = await res.json();
	}

	onMount(async () => {
		const res = await fetch('/api/posts/get');
		if (res.ok) {
			posts = await res.json();
		} else {
			console.error('โหลดโพสต์ไม่สำเร็จ');
		}
	});
</script>

<main>
	<h1>สาวโสด หาคนเลี้ยงดูทั้งหมด</h1>

	<!-- Search Bar -->
	<div style="text-align: center;">
		<input bind:value={keyword} placeholder="ค้นหา..." />
		<button on:click={search}>ค้นหา</button>
	</div>

	<!-- Post Grid -->
	{#if posts.length === 0}
		<p class="no-posts">ยังไม่มีโพสต์</p>
	{:else}
		<div class="post-container">
			{#each posts as post}
				<div class="post" on:click={() => goto(`/post/${post._id}`)} title="คลิกเพื่อดูโพสต์">
					<img src={post.imageUrl} alt="รูปภาพ" />
					<h3 class="post-title text-overflow">{post.title}</h3>
					<p><strong>เพศ:</strong> {post.gender}</p>
					<p><strong>อายุ:</strong> {post.age}</p>
					<p><strong>ไลน์:</strong> {post.line}</p>
					<p class="text-overflow-multiline"><strong>จังหวัด:</strong> {post.province}</p>
				</div>
			{/each}
		</div>
	{/if}
</main>

<style>
	/* General Layout */
	main {
		max-width: 1200px;
		margin: 0 auto;
		padding: 20px;
	}

	/* Header */
	h1 {
		text-align: center;
		font-size: 2.5rem;
		color: #333;
		margin-bottom: 20px;
	}

	/* Search Bar */
	input {
		padding: 12px;
		width: 80%;
		max-width: 300px;
		border-radius: 4px;
		border: 1px solid #ccc;
		margin-right: 10px;
		font-size: 1rem;
	}

	button {
		padding: 12px 20px;
		background-color: #6c63ff;
		color: white;
		border: none;
		border-radius: 4px;
		font-size: 1rem;
		cursor: pointer;
		transition: background-color 0.3s ease;
	}

	button:hover {
		background-color: #5a54d1;
	}

	/* Post Grid (4 Posts per Row) */
.post-container {
  display: grid;
  grid-template-columns: repeat(4, 1fr); /* 4 คอลัมน์ */
  gap: 20px;
  margin-top: 30px;
  padding: 0 15px; /* ปรับช่องว่างทางซ้ายและขวา */
}

/* Individual Post */
.post {
  background-color: #fafafa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden; /* ซ่อนไม่ให้เกิดการยืดของรูปภาพ */
  cursor: pointer; /* ให้มีเคอร์เซอร์มือเมื่อhover */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
}

.post:hover {
  transform: translateY(-10px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* Post Title */
.post-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  text-align: center;
  text-overflow: ellipsis; /* ใช้สำหรับข้อความที่ยาวเกิน */
  white-space: nowrap;
  overflow: hidden;
}

/* Post Image */
.post img {
  width: 100%; /* กำหนดความกว้างเต็มพื้นที่ */
  height: 200px; /* ความสูงของรูปภาพ */
  object-fit: cover; /* ให้ภาพครอบพื้นที่เต็ม */
  border-radius: 8px; /* มุมรูปภาพโค้งมน */
  margin-bottom: 15px; /* ช่องว่างระหว่างรูปกับเนื้อหา */
}

/* Post Info */
.post p {
  margin: 5px 0;
  font-size: 1rem;
  color: #555;
}

/* Special Labels */
.post p strong {
  color: #0077cc;
}

/* No Posts Message */
.no-posts {
  text-align: center;
  font-size: 1.25rem;
  color: #999;
  margin-top: 50px;
}

/* Post Overflow Text (multiline ellipsis for description) */
.text-overflow-multiline {
  display: -webkit-box;
  -webkit-line-clamp: 3; /* จำกัดให้แสดง 3 บรรทัด */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

</style>
