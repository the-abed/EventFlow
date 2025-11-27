"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alice Johnson",
      feedback: "This platform made managing our events effortless!",
      img: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg",
    },
    {
      name: "Michael Smith",
      feedback: "The UI is clean and smooth. Love the experience!",
      img: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg",
    },
    {
      name: "Sophia Lee",
      feedback: "Very reliable and the features saved us so much time.",
      img: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg",
    },
    {
      name: "David Martin",
      feedback: "Amazing analytics tools! Helps track event performance.",
      img: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg",
    },
    {
      name: "Emma Robinson",
      feedback: "Easy to use and very efficient. Highly recommended.",
      img: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg",
    },
    {
      name: "Chris Evans",
      feedback: "Organizing events has never been this smooth!",
      img: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-14 text-primary">
        What Our Users Say
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="max-w-6xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div
              className="
                relative backdrop-blur-xl bg-white/30 
                border border-white/40 
                shadow-xl p-8 rounded-2xl 
                hover:-translate-y-2 hover:shadow-2xl 
                transition-all duration-300 text-center
              "
            >
              {/* Gradient Line */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"></div>

              {/* Profile Image */}
              <img
                src={t.img}
                alt={t.name}
                className="w-20 h-20 rounded-full mx-auto mb-6 object-cover shadow-md"
              />

              <p className="text-gray-800 italic mb-6 text-lg">"{t.feedback}"</p>
              <h4 className="font-semibold text-primary text-xl">{t.name}</h4>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
