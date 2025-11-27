"use client";

export default function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition transform hover:-translate-y-1 text-center">
      
      {Icon && (
        <Icon className="mx-auto mb-4 h-10 w-10 text-primary" strokeWidth={1.5} />
      )}

      <h3 className="text-xl font-bold mb-2 text-secondary">{title}</h3>
      <p className="text-gray-700">{description}</p>
    </div>
  );
}
