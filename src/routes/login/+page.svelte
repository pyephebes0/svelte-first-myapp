<script>
  let username = '';
  let password = '';
  let error = '';
  let success = '';

  async function loginUser() {
    error = '';
    success = '';

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.error || 'เกิดข้อผิดพลาดบางอย่าง';
        return;
      }

      success = 'เข้าสู่ระบบสำเร็จ กำลังเปลี่ยนหน้า...';
      setTimeout(() => {
        window.location.href = '/profile'; // redirect ไปหน้าโปรไฟล์
      }, 1000);
    } catch (err) {
      error = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์';
    }
  }
</script>

<h1>เข้าสู่ระบบ</h1>

<form on:submit|preventDefault={loginUser}>
  <label>ชื่อผู้ใช้</label>
  <input bind:value={username} required />

  <label>รหัสผ่าน</label>
  <input type="password" bind:value={password} required />

  <button type="submit">เข้าสู่ระบบ</button>
</form>

{#if error}
  <p style="color: red;">⚠️ {error}</p>
{/if}

{#if success}
  <p style="color: green;">✅ {success}</p>
{/if}
