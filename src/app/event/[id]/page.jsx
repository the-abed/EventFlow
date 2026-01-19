// src/app/(protected)/event/[id]/page.jsx

import BookingForm from "@/app/components/BookingForm";

export default async function EventDetails({ params }) {
  // 1. Await params in Next.js 15+
  const { id } = await params;

  // 2. Fetch the data (Ensure this URL returns the JSON array of events)
  const res = await fetch(`https://event-flow-server-phi.vercel.app/api/events`, {
    cache: 'no-store', // Ensures you get updated data
  });
  console.log(res);

  // 3. Check if the response is actually valid JSON
  if (!res.ok) {
    return <div className="p-10 text-red-500">Failed to load events from server.</div>;
  }

  const allEvents = await res.json();

  // 4. Filter/Find the specific event that matches the ID from the URL
  const event = allEvents.find((e) => e._id === id || e.id === id);

  // 5. Handle the case where the ID doesn't exist in your data
  if (!event) {
    return (
      <div className="p-20 text-center">
        <h1 className="text-2xl font-bold">Event Not Found</h1>
        <p>We couldnt find an event with ID: {id}</p>
      </div>
    );
  }

  // 6. Render the details
  return (
   <div className="max-w-4xl mx-auto px-4 pt-24 pb-12">
      
      {/* 1. Image Section - object-cover ensures it doesn't distort */}
      <div className="w-full h-[300px] md:h-[450px] relative rounded-2xl overflow-hidden shadow-lg">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* 2. Content Section */}
      <div className="mt-8">
        <h1 className="text-4xl font-extrabold ">{event.title}</h1>
        
        <div className="flex flex-wrap gap-3 mt-4">
          <span className="px-4 py-1.5 bg-blue-50 text-blue-700 rounded-full font-medium border border-blue-100">
            📍 {event.location}
          </span>
          <span className="px-4 py-1.5 bg-purple-50 text-purple-700 rounded-full font-medium border border-purple-100">
            📅 {event.date}
          </span>
        </div>

        <div className="mt-6 text-gray-700 text-lg leading-relaxed">
          <p>{event.description}</p>
        </div>
      </div>

      {/* 3. Booking Form Section - Now placed at the bottom */}
      <div className="mt-12 pt-8 border-t border-gray-200">
        <div className="max-w-2xl"> 
           <h2 className="text-2xl font-bold  mb-2">Reserve Your Spot</h2>
           <p className=" mb-6">Fill out the form below to join the {event.title}.</p>
           <BookingForm eventTitle={event.title} />
        </div>
      </div>
      
    </div>
  );
}