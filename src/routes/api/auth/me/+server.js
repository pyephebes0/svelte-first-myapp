import { getUserFromToken } from '$lib/server/utils.js';
export async function GET({ request }) {
  const user = await getUserFromToken(request);
  return new Response(null, { status: user ? 200 : 401 });
}
