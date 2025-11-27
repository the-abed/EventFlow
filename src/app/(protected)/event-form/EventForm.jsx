"use client";

import React, { useState } from "react";
import axiosSecure from "@/app/lib/axiosSecure";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("date", date);
      formData.append("location", location);
      if (image) formData.append("image", image);

      await axiosSecure.post("/api/events", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Event added successfully!");
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setImage(null);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      
      {/* Title */}
      <div className="relative">
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="peer w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
          placeholder="Event Title"
        />
        <label
          htmlFor="title"
          className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-0.6rem] peer-focus:text-accent peer-focus:text-xs transition-all"
        >
          Event Title
        </label>
      </div>

      {/* Description */}
      <div className="relative">
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="peer w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition resize-none"
          placeholder="Event Description"
        />
        <label
          htmlFor="description"
          className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-0.6rem] peer-focus:text-accent peer-focus:text-xs transition-all"
        >
          Event Description
        </label>
      </div>

      {/* Date & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="relative">
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="peer w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
            placeholder="Event Date"
          />
          <label
            htmlFor="date"
            className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-0.6rem] peer-focus:text-accent peer-focus:text-xs transition-all"
          >
            
          </label>
        </div>

        <div className="relative">
          <input
            type="text"
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="peer w-full p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-transparent focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition"
            placeholder="Event Location"
          />
          <label
            htmlFor="location"
            className="absolute left-4 top-4 text-gray-400 text-sm peer-placeholder-shown:top-4 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-sm peer-focus:top-[-0.6rem] peer-focus:text-accent peer-focus:text-xs transition-all"
          >
            Event Location
          </label>
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="text-gray-200"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-primary to-accent py-3 rounded-xl text-black font-semibold hover:opacity-90 transition"
      >
        {loading ? "Adding..." : "Add Event"}
      </button>
    </form>
  );
}
