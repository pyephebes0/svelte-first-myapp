import cookie from 'cookie';
export async function POST() {
  return new Response(JSON.stringify({ success: true }), {
    headers: {
      'Set-Cookie': cookie.serialize('token', '', {
        path: '/', httpOnly: true, maxAge: 0
      }),
      'Content-Type': 'application/json'
    }
  });
}
