"use client";

import React, { useEffect, useState } from "react";

import EventCard from "@/app/components/EventCard";
import axios from "axios";


const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
       const res = await axios.get("https://event-flow-server-phi.vercel.app/api/events");
        setEvents(res.data);
        console.log(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading events...</p>;
  if (!events.length) return <p className="text-center mt-10">No events found.</p>;

  return (
    <div className="py-16 px-4 ">
      <h2 className="text-3xl font-bold text-center mb-12 text-primary">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map((event) => (
          <EventCard
            key={event._id}
            id={event._id}
            title={event.title}
            description={event.description}
            date={event.date}
            location={event.location}
            image={event.image}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
