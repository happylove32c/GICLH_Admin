import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { createClient } from "@supabase/supabase-js";
import PulsingDot from "../Loader";

const supabaseUrl = 'https://edhjzdlzzjmkggptkfop.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaGp6ZGx6empta2dncHRrZm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTQxNTIsImV4cCI6MjA1NzAzMDE1Mn0.TX0QErQx2YebWGieP0jvKGbbp0Kxt_uhgibS47G8Dt4'
const supabase = createClient(supabaseUrl, supabaseKey)

const ChurchEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });

    const fetchEvents = async () => {
      try {
        const { data, error } = await supabase.from('event_cards').select('*');
        // console.log("Event Titles:", data.map(event => event.title));
        if (error) throw error;
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <PulsingDot />;
  // <p className="text-2xl sm:text-3xl font-bold text-center mb-6">Loading...</p>;
  if (error) return <p className="text-2xl sm:text-3xl font-bold text-center mb-6">Error: {error}</p>;

  return (
    <div className="overflow-hidden p-4">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-6">
        Upcoming Church Events
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div
            key={event.id}
            data-aos="fade-left"
            data-aos-delay={index * 200} // Delay animation for staggered effect
            className="bg-white shadow-lg rounded-2xl overflow-hidden border border-gray-200"
          >
            <img
              src={event.image}
              alt={event.title}
              className="w-full h-30 object-cover"
            />
            <div className="p-4 sm:p-6">
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-purple-700">
                {event.title}
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Date:</strong> {event.date}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Time:</strong> {event.time}
              </p>
              <p className="text-gray-600 text-sm sm:text-base">
                <strong>Location:</strong> {event.location}
              </p>
              <p className="text-gray-700 my-3 text-sm sm:text-base">
                {event.description}
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                <strong>Contact:</strong> {event.contact}
              </p>
              <button className="mt-4 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition text-sm sm:text-base">
                {event.cta}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChurchEvents;
