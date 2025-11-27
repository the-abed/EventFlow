"use client";

import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

export default function Hero() {
  const slides = [
    "https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=1920&q=80",
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&w=1920&q=80",
  ];

  return (
    <section className="relative w-full h-[50vh] md:h-[80vh] text-white flex items-center justify-center rounded-xl mt-28">
      {/* Background Slider */}
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop
        className="absolute inset-0 w-full h-full z-0"
      >
        {slides.map((src, index) => (
          <SwiperSlide key={index}>
            <div
              className="w-full h-full  bg-cover bg-center rounded-2xl"
              style={{ backgroundImage: `url(${src})` }}
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold text-primary mb-4">
                  Manage Your Events Seamlessly
                </h1>
                <p className="text-lg md:text-2xl mb-6">
                  Organize, track, and share your events all in one place.
                </p>
                <Link
                  href="/register"
                  className="inline-block px-8 py-3 bg-white text-primary font-semibold rounded-lg shadow hover:bg-gray-200 transition"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* Foreground Content */}
    </section>
  );
}
