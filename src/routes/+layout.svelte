<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  export let data;
  let loggedIn = data.isLoggedIn;

  export async function load({ cookies }) {
    // ตรวจสอบว่า cookies มี token หรือไม่
    const token = cookies.get('token');
    return { props: { isLoggedIn: !!token } }; // ถ้ามี token ถือว่า login แล้ว
  }
  
  onMount(async () => {
    const res = await fetch('/api/auth/me');
    loggedIn = res.ok;
  });
</script>

<nav class="main-nav">
  <a href="/">Home</a>
  {#if loggedIn}
    <a href="/profile">Profile</a>
    <a href="/logout" on:click|preventDefault={async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      location.reload();
    }}>Logout</a>
  {:else}
    <a href="/login">Login</a>
    <a href="/register">ลงทะเบียน</a>
  {/if}
</nav>
<hr class="nav-divider" />

<!-- เนื้อหา -->
<slot />


<style>
  .main-nav {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 16px 32px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  gap: 20px;
}

.main-nav a {
  text-decoration: none;
  color: #333;
  font-weight: 500;
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.3s ease;
}

.main-nav a:hover {
  background-color: #6c63ff;
  color: #fff;
}

.nav-divider {
  border: none;
  height: 1px;
  background: #e0e0e0;
  margin: 0;
}

</style>