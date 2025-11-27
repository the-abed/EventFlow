"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import axiosSecure from "@/app/lib/axiosSecure";
import Image from "next/image";

export default function ManageEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch ONLY logged-in user's events
  useEffect(() => {
    async function fetchEvents() {
      try {
        const token = localStorage.getItem("token");

        const res = await axiosSecure.get("/api/events/my-events", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setEvents(res.data || []);
      } catch (err) {
        console.error("Failed to fetch user events:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const token = localStorage.getItem("token");

      await axiosSecure.delete(`/api/events/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setEvents((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      console.error("Deletion failed:", err);
      alert("Failed to delete event");
    }
  };

  if (loading)
    return (
      <p className="text-center mt-20 text-xl animate-pulse text-gray-600">
        Loading your events...
      </p>
    );

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-primary">My Events</h1>
        <Link
          href="/add-event"
          className="bg-primary text-white px-5 py-2 rounded-xl shadow hover:bg-primary/90 transition"
        >
          + Add Event
        </Link>
      </div>

      {/* Empty State */}
      {events.length === 0 ? (
        <div className="text-center py-20 bg-white/40 rounded-xl backdrop-blur shadow">
          <h3 className="text-2xl font-semibold text-gray-700">
            You haven't created any events yet
          </h3>
          <p className="text-gray-500 mt-2">Start by creating your first event!</p>

          <Link
            href="/add-event"
            className="mt-6 inline-block bg-primary text-white px-6 py-2 rounded-lg shadow hover:bg-primary/80 transition"
          >
            Create Event
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event) => (
            <div
              key={event._id}
              className="
                bg-white/70 backdrop-blur-xl 
                border border-white/40 
                rounded-2xl shadow-lg 
                hover:-translate-y-2 hover:shadow-2xl
                transition-all duration-300 overflow-hidden
              "
            >
              {/* Event Image */}
              <div className="h-40 w-full overflow-hidden">
                <Image
                  src={event.image || "/placeholder.jpg"}
                  alt={event.title}
                  className="w-full h-full object-cover hover:scale-110 transition duration-500"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {event.title}
                </h2>

                <p className="text-gray-600 text-sm mb-1">
                  📅 {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-gray-600 text-sm mb-3">📍 {event.location}</p>

                <p className="text-gray-700 text-sm line-clamp-2 mb-4">
                  {event.description}
                </p>

                {/* Buttons */}
                <div className="flex justify-between mt-4">
                  <Link
                    href={`/add-event?id=${event._id}`}
                    className="px-4 py-1.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition"
                  >
                    Edit
                  </Link>

                  <button
                    onClick={() => handleDelete(event._id)}
                    className="px-4 py-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
