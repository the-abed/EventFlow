"use client";

import { Calendar, BarChart2, Users, Shield } from "lucide-react";

export default function Features() {
  const features = [
    {
      icon: <Calendar size={36} />,
      title: "Smart Event Scheduling",
      desc: "Plan, organize, and automate your events with smooth workflow management.",
    },
    {
      icon: <BarChart2 size={36} />,
      title: "Advanced Analytics",
      desc: "Track attendance, engagement, and growth with real-time insights.",
    },
    {
      icon: <Users size={36} />,
      title: "Team Collaboration",
      desc: "Invite team members and work together with role-based permissions.",
    },
    {
      icon: <Shield size={36} />,
      title: "Secure & Encrypted",
      desc: "Your event data is protected with industry-grade encryption.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-[#0e0f14] via-[#13151c] to-[#0f1117] text-white px-4">
      <h2 className="text-4xl font-bold text-center mb-14">
        Powerful Features for Every Event
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className="p-8 bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl hover:bg-white/10 transition-all duration-300 shadow-xl"
          >
            <div className="flex justify-center mb-5 text-accent">{f.icon}</div>
            <h3 className="text-xl font-semibold mb-3">{f.title}</h3>
            <p className="text-gray-300 text-sm">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
