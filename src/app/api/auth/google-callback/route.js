import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get("token");
  const error = searchParams.get("error");

  if (error) {
    return redirect(`/login?error=${encodeURIComponent(error)}`);
  }

  if (token) {
    // Redirect to login with token - the frontend will handle storing it
    return redirect(`/login?token=${token}&from=/manage-event`);
  }

  return redirect("/login?error=No token received");
}
