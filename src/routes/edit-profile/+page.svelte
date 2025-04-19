<script>
	import { onMount } from 'svelte';
	export let data;

	let email = '';
	let password = '';
	const user = data.user;

	onMount(() => {
		email = user.email;
	});

	async function updateProfile() {
		const res = await fetch('/api/auth/edit-profile', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email, password })
		});

		if (res.ok) {
			alert('บันทึกเรียบร้อยแล้ว');
			password = '';
		} else {
			const err = await res.json();
			alert('เกิดข้อผิดพลาด: ' + err.message);
		}
	}
</script>

<main class="edit-profile-container">
	<h1>แก้ไขโปรไฟล์</h1>

	<form on:submit|preventDefault={updateProfile}>
		<label>ชื่อผู้ใช้</label>
		<input type="text" value={user.username} disabled readonly />

		<label>อีเมล</label>
		<input type="email" bind:value={email} required />

		<label>รหัสผ่านใหม่</label>
		<input type="password" bind:value={password} placeholder="ถ้าไม่เปลี่ยน ปล่อยว่างไว้" />

		<button type="submit">บันทึกการเปลี่ยนแปลง</button>
	</form>
</main>

<style>
	.edit-profile-container {
		max-width: 600px;
		margin: 0 auto;
		padding: 20px;
	}

	label {
		display: block;
		margin-top: 1rem;
		font-weight: bold;
	}

	input {
		width: 100%;
		padding: 10px;
		margin-top: 5px;
		border: 1px solid #ccc;
		border-radius: 4px;
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
		cursor: pointer;
	}

	button:hover {
		background-color: #005fa3;
	}
</style>
