export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const error = searchParams.get("error");

  if (error) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/login?error=${encodeURIComponent(error)}`,
      },
    });
  }

  if (!code) {
    return new Response(null, {
      status: 302,
      headers: {
        Location: "/login?error=No authorization code received",
      },
    });
  }

  try {
    const host = request.headers.get("host");
    const protocol = request.headers.get("x-forwarded-proto") || "http";
    const siteURL = `${protocol}://${host}`;

    const clientID = process.env.GOOGLE_CLIENT_ID;
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
    const backendURL = process.env.BACKEND_URL || "http://localhost:5000";

    if (!clientID || !clientSecret) {
      throw new Error("Google credentials not configured");
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_id: clientID,
        client_secret: clientSecret,
        code: code,
        redirect_uri: `${siteURL}/api/auth/google/callback`,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenResponse.json();

    if (!tokenData.access_token) {
      throw new Error(tokenData.error || "Failed to get access token");
    }

    // Get user info
    const userResponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: { Authorization: `Bearer ${tokenData.access_token}` },
      }
    );

    const userInfo = await userResponse.json();

    // Send to backend for verification and token generation
    try {
      const backendResponse = await fetch(
        `${backendURL}/api/auth/google/callback`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: userInfo.email,
            name: userInfo.name,
            googleId: userInfo.id,
            picture: userInfo.picture,
          }),
        }
      );

      const backendData = await backendResponse.json();

      if (backendData.token) {
        return new Response(null, {
          status: 302,
          headers: {
            Location: `/login?token=${backendData.token}&from=/manage-event`,
          },
        });
      }
    } catch (backendErr) {
      console.warn(
        "Backend exchange failed, using Google token:",
        backendErr.message
      );
      // If backend fails, use the access token as a fallback
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/login?token=${tokenData.access_token}&from=/manage-event`,
        },
      });
    }

    throw new Error("Failed to generate login token");
  } catch (error) {
    console.error("Google callback error:", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/login?error=${encodeURIComponent(error.message)}`,
      },
    });
  }
}
