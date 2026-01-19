import React, { useEffect, useState } from 'react';

const EventDetails =  ({ params}) => {
    const { id } =  params;
  console.log(id);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchEvents = async () => {
        try {
          const res = await axiosSecure.get("/api/events"); // 🔹 backend link already set
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
    return (
        <div className='p-50'>
           <h2>Event Details for Event ID: {id}</h2> 
        </div>
    );
};

export default EventDetails;