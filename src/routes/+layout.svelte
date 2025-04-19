<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { goto } from '$app/navigation';
  let loggedIn = false;

  export async function load({ cookies }) {
    // ตรวจสอบว่า cookies มี token หรือไม่
    const token = cookies.get('token');
    return { props: { isLoggedIn: !!token } }; // ถ้ามี token ถือว่า login แล้ว
  }
  
  onMount(async () => {
    const res = await fetch('/api/auth/me');
    loggedIn = res.ok;
  });

  export let isLoggedIn = false;
</script>

<nav>
  <a href="/">Home</a>
  {#if loggedIn}
    <a href="/profile">Profile</a>
    <a href="/logout" on:click|preventDefault={async () => {
      await fetch('/api/auth/logout', { method: 'POST' });
      goto('/login');
    }}>Logout</a>
  {:else}
    <a href="/login">Login</a>
    <a href="/register">Register</a>
  {/if}
</nav>
<hr />
<slot />

<style>
  nav a {
    margin-right: 1rem;
  }
</style>