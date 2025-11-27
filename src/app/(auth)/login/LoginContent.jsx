"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axiosSecure from "@/app/lib/axiosSecure";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const fromParam = searchParams?.get("from") || "/";
  const tokenFromCallback = searchParams?.get("token");

  // Handle token from Google OAuth callback
  useEffect(() => {
    if (tokenFromCallback) {
      localStorage.setItem("token", tokenFromCallback);
      window.dispatchEvent(new Event("authChanged"));
      const target = decodeURIComponent(fromParam || "/manage-event");
      router.replace(target);
    }
  }, [tokenFromCallback, fromParam, router]);

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axiosSecure.post("/api/login", { email, password });
      localStorage.setItem("token", res.data.token);

      // Notify other components/tabs that auth changed
      window.dispatchEvent(new Event("authChanged"));

      // Redirect back to protected path if provided
      const target = decodeURIComponent(fromParam || "/");
      router.replace(target);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    const backendURL =
      process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";
    const googleAuthURL = `${backendURL}/api/auth/google`;
    console.log("Redirecting to:", googleAuthURL);
    window.location.href = googleAuthURL;
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-green-100 rounded shadow text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

      {searchParams?.get("error") && (
        <div className="mb-4 p-3 bg-red-200 text-red-800 rounded text-sm">
          Error: {searchParams.get("error")}
        </div>
      )}

      <form onSubmit={handleEmailLogin} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-primary text-white py-2 rounded hover:bg-primary/80 transition"
        >
          Login
        </button>
      </form>

      <div className="mt-6 text-center">
        <p className="mb-2 text-gray-500">Or login with</p>
        <button
          onClick={handleGoogleLogin}
          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition"
        >
          Google
        </button>
      </div>
    </div>
  );
}
