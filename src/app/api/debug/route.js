export async function GET(request) {
  const siteURL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const clientID = process.env.GOOGLE_CLIENT_ID;
  const redirectURI = `${siteURL}/api/auth/google/callback`;

  return new Response(
    JSON.stringify(
      {
        siteURL,
        clientID: clientID ? "✓ Set" : "✗ Missing",
        redirectURI,
        hostname: request.headers.get("host"),
        url: request.url,
      },
      null,
      2
    ),
    { headers: { "Content-Type": "application/json" } }
  );
}
