// Cloudflare Pages Function — GET /auth
// Decap CMS-இன் "Login with GitHub" button இதை அழைக்கும்.
// இது GitHub-இன் OAuth authorize பக்கத்திற்கு redirect செய்யும்.
//
// தேவையான Environment Variables (Cloudflare Pages dashboard -> Settings -> Environment variables):
//   GITHUB_CLIENT_ID      — GitHub OAuth App-இன் Client ID
//   GITHUB_CLIENT_SECRET  — GitHub OAuth App-இன் Client Secret (callback.js-க்கு தேவை)

export async function onRequestGet({ request, env }) {
  const url = new URL(request.url);
  const redirectUri = `${url.origin}/callback`;

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: 'repo,user',
  });

  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params.toString()}`,
    302
  );
}
