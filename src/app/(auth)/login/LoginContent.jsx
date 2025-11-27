"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import axiosSecure from "@/app/lib/axiosSecure";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "@/app/lib/firebase.config";
import GoogleLoginButton from "@/app/components/GoogleLoginButton";

export default function LoginContent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();

  // safe getter for search params (protects against unexpected nulls)
  const getParam = (key) => {
    try {
      return searchParams?.get?.(key) ?? null;
    } catch {
      return null;
    }
  };

  const fromParam = getParam("from") || "/";
  const tokenFromCallback = getParam("token");

  // Handle token from Google OAuth callback
  useEffect(() => {
    if (tokenFromCallback) {
      try {
        localStorage.setItem("token", tokenFromCallback);
        window.dispatchEvent(new Event("authChanged"));
        const target = decodeURIComponent(fromParam || "/manage-event");
        router.replace(target);
      } catch (e) {
        // fallback
        router.replace("/manage-event");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenFromCallback]); // only depend on tokenFromCallback

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setLoading(true);

    try {
      const res = await axiosSecure.post("/api/login", { email, password });

      if (!res?.data?.token) {
        throw new Error("No token received");
      }

      localStorage.setItem("token", res.data.token);
      // Notify other components/tabs that auth changed
      window.dispatchEvent(new Event("authChanged"));

      // Redirect to original protected page or home
      const target = decodeURIComponent(fromParam || "/");
      router.replace(target);
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Login failed";
      setErrorMessage(msg);
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const token = await result.user.getIdToken();
  localStorage.setItem("token", token);
  window.dispatchEvent(new Event("authChanged"));

  const target = decodeURIComponent(fromParam || "/manage-event");
  router.replace(target);
  
};

  // const handleGoogleLogin = () => {
  //   const backendURL = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";
  //   const googleAuthURL = `${backendURL}/api/auth/google`;
  //   // redirect user to backend which starts Google OAuth flow
  //   window.location.href = googleAuthURL;
  // };

  return (
    <div className="min-h-screen flex items-center justify-center  px-4">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/50">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to manage your events
        </p>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-300">
            ⚠ {errorMessage}
          </div>
        )}

        {/* If there's an "error" param show it too (safe get) */}
        {getParam("error") && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-300">
            ⚠ {getParam("error")}
          </div>
        )}

        {/* Email Login Form */}
        <form onSubmit={handleEmailLogin} className="flex flex-col gap-4 text-black">
          <div>
            <label className="text-gray-700 text-sm mb-1 block">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="text-gray-700 text-sm mb-1 block">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded-xl font-semibold transition-shadow ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:bg-green-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Signing in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <span className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Login Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-xl font-medium shadow-sm hover:shadow transition"
        >
          {/* If you have a small google logo in public/google-logo.png */}
          <Image src="/google.png" alt="Google" width={20} height={20} className="object-contain" />
          Continue with Google
        </button>

        {/* Signup Link */}
        <p className="text-center text-gray-600 mt-5 text-sm">
          Don’t have an account?
          <a href="/register" className="text-green-700 font-semibold hover:underline ml-1">
            Create one
          </a>
        </p>
      </div>
    </div>
  );
}
