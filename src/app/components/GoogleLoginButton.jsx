"use client";

import { auth, googleProvider } from "@/app/lib/firebase.config";
import { signInWithPopup } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function GoogleLoginButton() {
  const router = useRouter();

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);
      router.push("/manage-event"); // redirect after login
    } catch (err) {
      console.error("Google login failed:", err);
    }
  };

  return (
    <button
      onClick={handleGoogleLogin}
      className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
    >
      Login with Google
    </button>
  );
}
