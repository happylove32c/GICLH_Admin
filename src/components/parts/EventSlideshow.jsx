import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://edhjzdlzzjmkggptkfop.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaGp6ZGx6empta2dncHRrZm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTQxNTIsImV4cCI6MjA1NzAzMDE1Mn0.TX0QErQx2YebWGieP0jvKGbbp0Kxt_uhgibS47G8Dt4'
const supabase = createClient(supabaseUrl, supabaseKey)



export default function EventSlideshow() {
  const [events, setEvents] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("event_slider").select("*");
      if (error) {
        console.error("Error loading events:", error);
      } else {
        setEvents(data);
      }
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    if (events.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % events.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [events]);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? events.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % events.length);
  };

  if (events.length === 0) {
    return <p className="text-center mt-10 text-gray-600">Loading events...</p>;
  }

  return (
    <div className="p-4 overflow-hidden">
      <div className="relative w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={events[current].id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="relative bg-white shadow-lg rounded-lg overflow-hidden"
          >
            <div className="relative w-full h-64">
              <img
                src={events[current].image}
                alt={events[current].name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center text-white p-4">
                <h2 className="text-xl font-bold">{events[current].name}</h2>
                <p className="text-gray-300">{events[current].date} | {events[current].time}</p>
                <p className="text-gray-300 mt-1">{events[current].location}</p>
              </div>
            </div>
            <div className="p-4 text-center">
              <p className="mt-2 text-gray-600">{events[current].description}</p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* <button
          onClick={prevSlide}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-600"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white px-3 py-2 rounded-full shadow-md hover:bg-gray-600"
        >
          ❯
        </button> */}
      </div>
    </div>
  );
}