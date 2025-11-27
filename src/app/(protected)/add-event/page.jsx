"use client";

import React from "react";
import EventForm from "../event-form/EventForm";

const AddEventPage = () => {
  return (
    <div className="min-h-screen pt-24 px-4 pb-12 bg-gradient-to-br from-[#0c0d12] via-[#13151c] to-[#0f1117] text-white flex flex-col items-center">
      
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-10">
        
        <h2 className="text-4xl font-bold text-center mb-2 text-accent">
          Add Event
        </h2>
        <p className="text-center text-gray-300 mb-8">
          Create a new event and share it with your audience
        </p>

        {/* Event Form */}
        <div className="bg-white/20 p-6 rounded-xl shadow-inner">
          <EventForm />
        </div>
      </div>
    </div>
  );
};

export default AddEventPage;
