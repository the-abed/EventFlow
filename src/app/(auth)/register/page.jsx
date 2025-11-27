"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosSecure from "@/app/lib/axiosSecure";
import Image from "next/image";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");

    try {
      await axiosSecure.post("/api/register", { name, email, password });

      router.push("/login?registered=success");
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Registration failed";
      setErrorMessage(msg);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br px-4 mt-10">

      <div className="w-full max-w-md bg-white/90 backdrop-blur-lg p-8 rounded-2xl shadow-xl border border-white/50">

        {/* Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Create Account
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Join EventFlow and start managing your events
        </p>

        {/* Error */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm border border-red-300">
            ⚠ {errorMessage}
          </div>
        )}

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          {/* Name */}
          <div>
            <label className="text-gray-700 text-sm mb-1 block">Full Name</label>
            <input
              type="text"
              placeholder="Your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-500 focus:outline-none"
            />
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Register Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-green-600 text-white py-3 rounded-xl font-semibold transition-shadow ${
              loading
                ? "opacity-70 cursor-not-allowed"
                : "hover:bg-green-700 shadow-md hover:shadow-lg"
            }`}
          >
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        {/* Divider */}
        <div className="my-5 flex items-center gap-3">
          <span className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-500 text-sm">OR</span>
          <span className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Register (optional) */}
        <button
          type="button"
          disabled
          className="w-full flex items-center justify-center gap-3 bg-gray-200 text-gray-500 py-3 rounded-xl font-medium cursor-not-allowed"
        >
          <Image src="/google.png" alt="Google" width={20} height={20} />
          Sign up with Google (Not enabled)
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 mt-5 text-sm">
          Already have an account?
          <a href="/login" className="text-green-700 font-semibold hover:underline ml-1">
            Login here
          </a>
        </p>
      </div>
    </div>
  );
}
