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
    <section className="py-20 mb-5  px-4">
      <h2 className="text-4xl font-bold text-center mb-14">
        Simple & Transparent Pricing
      </h2>

      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 ">
        {plans.map((p, i) => (
          <div
            key={i}
            className="dark:bg-gray-900 bg-yellow-50 rounded-xl shadow-lg p-8 hover:shadow-2xl transition-all"
          >
            <h3 className="text-2xl font-semibold mb-4 text-center">{p.title}</h3>
            <p className="text-4xl font-bold text-center mb-8">{p.price}</p>

            <ul className="space-y-3 ">
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
