"use client";

export default function Pricing() {
  const plans = [
    {
      title: "Starter",
      price: "Free",
      benefits: ["Create up to 3 events", "Basic analytics", "Email support"],
    },
    {
      title: "Pro",
      price: "$9/mo",
      benefits: ["Unlimited Events", "Growth Analytics", "Team Access", "Priority Support"],
      highlight: true,
    },
    {
      title: "Enterprise",
      price: "$29/mo",
      benefits: ["Multi-team workspace", "Advanced metrics", "Dedicated support"],
    },
  ];

  return (
    <section className="py-20 bg-[#0c0d12] text-white px-4">
      <h2 className="text-4xl font-bold text-center mb-14">
        Simple & Transparent Pricing
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {plans.map((p, i) => (
          <div
            key={i}
            className={`
              p-10 rounded-2xl shadow-2xl border backdrop-blur-xl
              ${
                p.highlight
                  ? "bg-white/10 border-accent/40 scale-105"
                  : "bg-white/5 border-white/10"
              }
              transition-all duration-300 hover:scale-105 hover:bg-white/10
            `}
          >
            <h3 className="text-2xl font-semibold mb-4 text-center">{p.title}</h3>
            <p className="text-4xl font-bold text-center mb-8">{p.price}</p>

            <ul className="space-y-3 text-gray-300">
              {p.benefits.map((b, idx) => (
                <li key={idx}>✔ {b}</li>
              ))}
            </ul>

            <button
              className={`mt-8 w-full py-3 rounded-lg font-semibold transition-all ${
                p.highlight
                  ? "bg-accent text-black hover:bg-accent/80"
                  : "bg-white/10 hover:bg-white/20"
              }`}
            >
              Choose Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
