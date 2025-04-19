<script>
  let username = '';
  let password = '';
  let email = '';
  let error = '';
  let success = '';

  async function registerUser() {
    error = '';
    success = '';

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, email })
      });

      const data = await res.json();

      if (!res.ok) {
        error = data.error || 'เกิดข้อผิดพลาดบางอย่าง';
        return;
      }

      success = 'สมัครสมาชิกสำเร็จ กำลังเข้าสู่ระบบ...';
      setTimeout(() => {
        window.location.href = '/profile'; // เปลี่ยนหน้าไปที่หน้าโปรไฟล์
      }, 1000);
    } catch (err) {
      error = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์';
    }
  }
</script>

<h1>สมัครสมาชิก</h1>

<form on:submit|preventDefault={registerUser}>
  <label>ชื่อผู้ใช้</label>
  <input bind:value={username} required />

  <label>รหัสผ่าน</label>
  <input type="password" bind:value={password} required />

  <label>อีเมล์</label>
  <input type="email" bind:value={email} required />

  <button type="submit">สมัครสมาชิก</button>
</form>

{#if error}
  <p style="color: red;">⚠️ {error}</p>
{/if}

{#if success}
  <p style="color: green;">✅ {success}</p>
{/if}
