"use client";

import Image from "next/image";
import Link from "next/link";

export default function EventCard({ title, description, date, location, image, id }) {
  return (
    <Link href={`/event/${id}`}>
    <div className="dark:bg-gray-900 rounded-lg shadow hover:shadow-lg overflow-hidden transition transform hover:-translate-y-1">
      {image && (
       <img
        className="w-full h-52 object-cover"
       src={image} alt="" />
      )}
      <div className="p-4">
        <h3 className="text-xl text-primary font-bold mb-2">{title}</h3>
        <p className="text-gray-700 mb-2">{description}</p>
        <p className="text-sm text-gray-500">
          {new Date(date).toLocaleDateString()} | {location}
        </p>
      </div>
    </div>
    </Link>
  );
}
