"use client";

import Link from "next/link";

export default function CTABanner() {
  return (
    <section className="relative overflow-hidden py-20 px-6 mt-6">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-90"></div>

      {/* Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-20"></div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto text-center text-white">
        <h2 className="text-3xl md:text-5xl font-extrabold mb-4 leading-tight drop-shadow-lg">
          Ready to Create & Manage Your Events Like a Pro?
        </h2>

        <p className="text-lg md:text-xl mb-8 opacity-90">
          Join thousands of organizers simplifying event planning with our modern tools.
        </p>

        <Link
          href="/register"
          className="inline-block bg-white text-primary font-semibold px-10 py-4 rounded-full shadow-xl 
                     hover:shadow-2xl hover:scale-105 hover:bg-gray-100 transition-all duration-300"
        >
          Sign Up Now
        </Link>
      </div>

      {/* Glow Effect */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-white/20 blur-3xl rounded-full"></div>
    </section>
  );
}
