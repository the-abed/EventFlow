"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import axiosSecure from "@/app/lib/axiosSecure";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function EventForm({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      date: "",
      time: "",
      location: "",
      capacity: "",
      imageUrl: "",
      category: "other",
    },
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const payload = {
        ...data,
        capacity: parseInt(data.capacity) || 0,
        imageUrl: data.imageUrl || "",
      };

      const res = await axiosSecure.post("/api/events", payload);

      if (res.status === 200 || res.status === 201) {
        // Show success alert
        await Swal.fire({
          icon: "success",
          title: "Event Created!",
          text: "Your event has been created successfully.",
          confirmButtonColor: "#0EA5E9",
          confirmButtonText: "Go to Manage Events",
        });

        reset();
        if (onSuccess) onSuccess(res.data);

        // Redirect to manage events page
        router.push("/manage-event");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Failed to create event";

      // Show error alert
      await Swal.fire({
        icon: "error",
        title: "Error!",
        text: message,
        confirmButtonColor: "#0EA5E9",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Event Title *
          </label>
          <input
            type="text"
            placeholder="Enter event title"
            {...register("title", {
              required: "Event title is required",
              minLength: {
                value: 3,
                message: "Title must be at least 3 characters",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary placeholder:text-gray-400"
          />
          {errors.title && (
            <span className="text-red-500 text-sm">{errors.title.message}</span>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category *
          </label>
          <select
            {...register("category")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary placeholder:text-gray-400"
          >
            <option value="sports">Sports</option>
            <option value="music">Music</option>
            <option value="tech">Tech</option>
            <option value="business">Business</option>
            <option value="education">Education</option>
            <option value="other">Other</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Date *
          </label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary placeholder:text-gray-400"
          />
          {errors.date && (
            <span className="text-red-500 text-sm">{errors.date.message}</span>
          )}
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time *
          </label>
          <input
            type="time"
            {...register("time", { required: "Time is required" })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary placeholder:text-gray-400"
          />
          {errors.time && (
            <span className="text-red-500 text-sm">{errors.time.message}</span>
          )}
        </div>

        {/* Location */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <input
            type="text"
            placeholder="Enter event location"
            {...register("location", {
              required: "Location is required",
              minLength: {
                value: 3,
                message: "Location must be at least 3 characters",
              },
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary placeholder:text-gray-400"
          />
          {errors.location && (
            <span className="text-red-500 text-sm">
              {errors.location.message}
            </span>
          )}
        </div>

        {/* Capacity */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Capacity (attendees) *
          </label>
          <input
            type="number"
            placeholder="Max attendees"
            {...register("capacity", {
              required: "Capacity is required",
              min: { value: 1, message: "Capacity must be at least 1" },
            })}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary placeholder:text-gray-400"
          />
          {errors.capacity && (
            <span className="text-red-500 text-sm">
              {errors.capacity.message}
            </span>
          )}
        </div>
        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="text"
            placeholder="https://example.com/image.jpg"
            {...register("imageUrl")}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary placeholder:text-gray-400"
          />
        </div>
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Description *
        </label>
        <textarea
          placeholder="Event description"
          rows="5"
          {...register("description", {
            required: "Description is required",
            minLength: {
              value: 10,
              message: "Description must be at least 10 characters",
            },
          })}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-primary placeholder:text-gray-400"
        />
        {errors.description && (
          <span className="text-red-500 text-sm">
            {errors.description.message}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 rounded hover:bg-primary/80 transition disabled:opacity-50"
      >
        {loading ? "Creating Event..." : "Create Event"}
      </button>
    </form>
  );
}
