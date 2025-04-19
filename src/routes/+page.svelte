<script>
  import { onMount } from 'svelte';

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


<h1>โพสต์ทั้งหมด</h1>
<input bind:value={keyword} placeholder="ค้นหา..." />
<button on:click={search}>ค้นหา</button>

{#if posts.length === 0}
  <p>ยังไม่มีโพสต์</p>
{:else}
  {#each posts as post}
    <div class="post">
      <img src={post.imageUrl} alt="รูปภาพ" width="150" />
      <p>เพศ: {post.gender}</p>
      <p>อายุ: {post.age}</p>
      <p>ไลน์: {post.line}</p>
      <p>จังหวัด: {post.province}</p>
      <p>รายละเอียด: {post.description}</p>
    </div>
  {/each}
{/if}