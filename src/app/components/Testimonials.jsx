"use client";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Alice",
      feedback: "This platform made managing our events effortless!",
    },
    {
      name: "Bob",
      feedback: "Great UI and easy to use. Highly recommended.",
    },
    {
      name: "Charlie",
      feedback: "I love the analytics features. Very insightful!",
    },
  ];

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10 rounded-lg">
      <h2 className="text-4xl font-bold text-center mb-14 text-primary">
        What Our Users Say
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className="
              relative backdrop-blur-xl bg-white/30 
              border border-white/40 
              shadow-xl p-8 rounded-2xl 
              hover:-translate-y-2 hover:shadow-2xl 
              transition-all duration-300
            "
          >
            {/* Floating Gradient Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl"></div>

            <p className="text-gray-800 italic mb-6 text-lg">"{t.feedback}"</p>

            <h4 className="font-semibold text-primary text-xl">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
}
