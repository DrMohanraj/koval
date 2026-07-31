// Cloudflare Pages Function — GET /callback
// GitHub, login-க்குப் பிறகு இங்கு ?code=... உடன் redirect செய்யும்.
// இந்த function அந்த code-ஐ access_token-ஆக மாற்றி, Decap CMS-இன்
// postMessage handshake மூலம் திரும்ப அனுப்பும்.

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return new Response('Missing code parameter', { status: 400 });
  }

  const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const tokenData = await tokenResponse.json();

  if (tokenData.error || !tokenData.access_token) {
    return new Response(
      `GitHub OAuth error: ${tokenData.error_description || tokenData.error || 'unknown error'}`,
      { status: 400 }
    );
  }

  const token = tokenData.access_token;

  // Decap CMS-இன் expected postMessage handshake:
  // 1. popup, opener-க்கு "authorizing:github" அனுப்பும்
  // 2. opener (CMS) அதே message-ஐ echo பண்ணும்
  // 3. popup, echo வந்தவுடன் இறுதி success message + token அனுப்பும்
  const html = `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /><title>Authorizing…</title></head>
<body>
<script>
  (function() {
    function receiveMessage(e) {
      window.opener.postMessage(
        'authorization:github:success:${JSON.stringify({ token, provider: 'github' })}',
        e.origin
      );
      window.removeEventListener('message', receiveMessage, false);
    }
    window.addEventListener('message', receiveMessage, false);
    window.opener.postMessage('authorizing:github', '*');
  })();
</script>
<p>Login successful. இந்த window-ஐ மூடலாம்…</p>
</body>
</html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
  });
}
