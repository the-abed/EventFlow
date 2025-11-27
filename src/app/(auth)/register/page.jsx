"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axiosSecure from "@/app/lib/axiosSecure";


export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axiosSecure.post("/api/register", { name, email, password });
      alert("Registration successful! Login now.");
      router.push("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-green-100 rounded shadow text-black">
      <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />
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
        <button type="submit" className="bg-primary text-white py-2 rounded hover:bg-primary/80 transition">
          Register
        </button>
      </form>
    </div>
  );
}
