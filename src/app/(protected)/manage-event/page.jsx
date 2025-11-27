"use client";

import { useEffect, useState } from "react";

import Link from "next/link";
import axiosSecure from "@/app/lib/axiosSecure";

export default function ManageEvent() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch events from backend
  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await axiosSecure.get("/api/events");
        setEvents(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;
    try {
      await axiosSecure.delete(`/api/events/${id}`);
      setEvents(events.filter((e) => e._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p className="text-center mt-20">Loading events...</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Manage Events</h1>
        <Link href="/add-event" className="bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition">
          + Add Event
        </Link>
      </div>

      {events.length === 0 ? (
        <p className="text-center text-gray-500">No events found. Add your first event!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div key={event._id} className="bg-white p-4 rounded shadow hover:shadow-lg transition">
              <h2 className="text-xl font-bold mb-2">{event.title}</h2>
              <p className="text-gray-600 mb-1">
                <span className="font-semibold">Date:</span> {new Date(event.date).toLocaleDateString()}
              </p>
              <p className="text-gray-600 mb-3">
                <span className="font-semibold">Location:</span> {event.location}
              </p>
              <div className="flex justify-between mt-4">
                <Link
                  href={`/add-event?id=${event._id}`}
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600 transition"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDelete(event._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
