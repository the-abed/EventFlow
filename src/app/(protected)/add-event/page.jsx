import React from "react";
import EventForm from "../event-form/EventForm";

const page = () => {
  return (
    <div className="min-h-screen pt-24 px-4 pb-12">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center mb-2 text-primary">
          Add Event
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Create a new event and share it with others
        </p>
        <EventForm />
      </div>
    </div>
  );
};

export default page;
