export async function GET(request) {
  try {
    const clientID = process.env.GOOGLE_CLIENT_ID;

    if (!clientID) {
      return new Response(
        JSON.stringify({ error: "GOOGLE_CLIENT_ID not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Get the actual host from the request to handle different ports
    const host = request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const siteURL = `${protocol}://${host}`;

    const redirectURI = `${siteURL}/api/auth/google/callback`;
    const scope = "openid email profile";
    const responseType = "code";
    const state = Math.random().toString(36).substring(7);

    const googleAuthURL = `https://accounts.google.com/o/oauth2/v2/auth?${new URLSearchParams(
      {
        client_id: clientID,
        redirect_uri: redirectURI,
        response_type: responseType,
        scope: scope,
        state: state,
      }
    ).toString()}`;

    return new Response(null, {
      status: 302,
      headers: {
        Location: googleAuthURL,
      },
    });
  } catch (error) {
    console.error("Google login error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
