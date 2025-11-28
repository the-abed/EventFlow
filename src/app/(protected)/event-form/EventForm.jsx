"use client";

import React, { useState } from "react";
import axiosSecure from "@/app/lib/axiosSecure";
import Swal from "sweetalert2";
import { useSession } from "next-auth/react";

export default function EventForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data: session } = useSession();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) return Swal.fire("Error", "Please select an image", "error");

    setLoading(true);

    try {
      // 1️⃣ Upload image to ImgBB
      const formData = new FormData();
      formData.append("image", image);

      const imgbbApiKey = process.env.NEXT_PUBLIC_IMGBB_API;
      const imgbbRes = await fetch(
        `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
        { method: "POST", body: formData }
      );

      if (!imgbbRes.ok) throw new Error("Failed to upload image");

      const imgbbData = await imgbbRes.json();
      const imageUrl = imgbbData.data.url;

      // 2️⃣ Send event data to backend
      

      const res = await axiosSecure.post("/api/events", {
        title,
        description,
        date,
        location,
        image: imageUrl,
       
      },
      );

      if (res.status !== 201)
        throw new Error(res.data?.message || "Failed to create event");

      Swal.fire({
        icon: "success",
        title: "Event added successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setDate("");
      setLocation("");
      setImage(null);
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: err.message || "Failed to add event",
        showConfirmButton: false,
        timer: 1500,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 max-w-xl mx-auto p-6 bg-white/10 backdrop-blur-md rounded-2xl shadow-lg"
    >
      {/* Title */}
      <div className="flex flex-col">
        <label className="text-gray-200 font-medium mb-1">Event Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition shadow-sm"
        />
      </div>

      {/* Description */}
      <div className="flex flex-col">
        <label className="text-gray-200 font-medium mb-1">
          Event Description
        </label>
        <textarea
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          rows={4}
          className="p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition shadow-sm resize-none"
        />
      </div>

      {/* Date & Location */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <label className="text-gray-200 font-medium mb-1">Event Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="p-4 rounded-xl bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition shadow-sm"
          />
        </div>
        <div className="flex flex-col">
          <label className="text-gray-200 font-medium mb-1">Location</label>
          <input
            type="text"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            className="p-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition shadow-sm"
          />
        </div>
      </div>

      {/* Image Upload */}
      <div className="flex flex-col">
        <label className="text-gray-200 font-medium mb-1">Event Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
          className="text-gray-200 p-2 rounded-xl bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-accent transition"
        />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={loading}
        className="bg-gradient-to-r from-primary to-accent py-3 rounded-xl text-black font-semibold hover:opacity-90 transition shadow-md btn bg-primary hover:bg-accent hover:text-white"
      >
        {loading ? "Adding..." : "Add Event"}
      </button>
    </form>
  );
}
