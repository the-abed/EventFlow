"use client";

import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

export default function BookingForm({ eventTitle }) {
  const [loading, setLoading] = useState(false);

  const handleBooking = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
      toast.success(`Successfully booked: ${eventTitle}!`, {
        duration: 4000,
        position: 'top-center',
        style: {
          background: '#10b981',
          color: '#fff',
          fontWeight: 'bold',
        },
      });
      e.target.reset(); // Clear form
    }, 1500);
  };

  return (
    <div className="mt-8 p-6  rounded-2xl shadow-sm">
      <Toaster />
      <h3 className="text-xl font-bold mb-4">Book Your Spot</h3>
      
      <form onSubmit={handleBooking} className="space-y-4">
        <div>
          <label className="block text-sm font-medium ">Full Name</label>
          <input 
            required 
            type="text" 
            placeholder="John Doe"
            className="w-full  mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>

        <div>
          <label className="block text-sm font-medium ">Email Address</label>
          <input 
            required 
            type="email" 
            placeholder="john@example.com"
            className="w-full mt-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" 
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-all disabled:bg-gray-400"
        >
          {loading ? "Processing..." : "Confirm Booking"}
        </button>
      </form>
    </div>
  );
}