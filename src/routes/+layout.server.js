// src/routes/+layout.server.js
/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies }) {
  const token = cookies.get('token');
  return {
    isLoggedIn: !!token
  };
}
