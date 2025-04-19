<script>
  let gender = '', age = '', line = '', province = '', details = '', image = '';

  export let data;
  let user = data.user;
  console.log(data);
  async function post() {
    const res = await fetch('/api/posts/create', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ gender, age, line, province, details, image })
    });
    if (res.ok) alert('โพสต์แล้ว');
  }
</script>

<h1>โปรไฟล์</h1>

<h1>สวัสดีคุณ {user.username}</h1>
<p>นี่คือหน้าส่วนตัวของคุณ</p>

<input bind:value={gender} placeholder="เพศ" />
<input bind:value={age} placeholder="อายุ" />
<input bind:value={line} placeholder="ไลน์" />
<input bind:value={province} placeholder="จังหวัด" />
<textarea bind:value={details} placeholder="รายละเอียด"></textarea>
<input bind:value={image} placeholder="URL รูปภาพ" />
<button on:click={post}>โพสต์</button>