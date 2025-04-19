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

<main>
<div class="register-wrapper">
  <form class="register-form" on:submit|preventDefault={registerUser}>
    <h2>สมัครสมาชิก</h2>

    <label for="username">ชื่อผู้ใช้</label>
    <input id="username" name="username" type="text" bind:value={username} required />

    <label for="password">รหัสผ่าน</label>
    <input id="password" name="password" bind:value={password} type="password" required />

    <label for="email">อีเมล์</label>
    <input id="email" name="email" type="email" bind:value={email} required />

    <button type="submit">สมัครสมาชิก</button>
  </form>
</div>

{#if error}
  <p style="color: red;">⚠️ {error}</p>
{/if}

{#if success}
  <p style="color: green;">✅ {success}</p>
{/if}

</main>

<style>
  /* รีเซ็ตพื้นฐาน */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body, html {
  height: 100%;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

main {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

/* Container กลางจอ */
.register-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

/* กล่องฟอร์ม */
.register-form {
  background-color: #fff;
  padding: 30px 35px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

/* หัวเรื่อง */
.register-form h2 {
  text-align: center;
  margin-bottom: 24px;
  color: #333;
}

/* label */
.register-form label {
  display: block;
  margin-bottom: 6px;
  font-weight: 500;
  color: #555;
}

/* input */
.register-form input {
  width: 100%;
  padding: 10px 12px;
  margin-bottom: 18px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border 0.3s ease;
}

.register-form input:focus {
  border-color: #6c63ff;
  outline: none;
}

/* ปุ่ม */
.register-form button {
  width: 100%;
  padding: 12px;
  background-color: #6c63ff;
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s ease;
}

.register-form button:hover {
  background-color: #554fd1;
}

</style>