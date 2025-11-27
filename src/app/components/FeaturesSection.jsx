"use client";

import { Calendar, Users, LayoutTemplate, BarChart3 } from "lucide-react";

import FeatureCard from "./FeatureCard";

export default function FeaturesSection() {
 const features = [
  { icon: Calendar, title: "Easy Event Creation", description: "Create events in seconds with our intuitive form." },
  { icon: Users, title: "Manage Attendees", description: "Track RSVPs, attendance, and notifications efficiently." },
  { icon: LayoutTemplate, title: "Customizable Templates", description: "Choose from pre-designed templates for fast setup." },
  { icon: BarChart3, title: "Analytics & Reports", description: "Get insights about your events and audience." },
];


  return (
    <section className="py-20 px-4 ">
      <h2 className="text-4xl font-bold text-center mb-12 text-primary">
        Powerful Features for Effortless Event Management
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <FeatureCard key={i} title={f.title} description={f.description} icon={f.icon} />
        ))}
      </div>
    </section>
  );
}
