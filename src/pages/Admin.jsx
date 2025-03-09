import React, { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://edhjzdlzzjmkggptkfop.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVkaGp6ZGx6empta2dncHRrZm9wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0NTQxNTIsImV4cCI6MjA1NzAzMDE1Mn0.TX0QErQx2YebWGieP0jvKGbbp0Kxt_uhgibS47G8Dt4'
const supabase = createClient(supabaseUrl, supabaseKey)

const Admin = () => {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showAddEventModal, setShowAddEventModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newEvent, setNewEvent] = useState({
    image: "",
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    contact: "",
    cta: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
      setShowModal(!data?.user);
    };

    const fetchEvents = async () => {
      const { data, error } = await supabase.from("event_cards").select("*");
      if (error) console.error("Error fetching events:", error);
      else setEvents(data);
    };

    fetchUser();
    if (user) fetchEvents();
  }, [user]);

  const handleSignIn = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert("Sign-in failed: " + error.message);
    else setUser(data.user);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const { error } = await supabase.from("event_cards").delete().eq("id", id);
    if (error) {
      console.error("Error deleting event:", error);
    } else {
      setEvents(events.filter((event) => event.id !== id));
    }
  };

  const handleAddEvent = async () => {
    if (!newEvent.title || !newEvent.image || !newEvent.date || !newEvent.time || !newEvent.location || !newEvent.description || !newEvent.cta || !newEvent.contact) {
      alert("Please fill in all fields!");
      return;
    }
  
    const { data, error } = await supabase
      .from("event_cards")
      .insert([newEvent]);
  
    if (error) {
      console.error("Error adding event:", error);
    } else {
      setEvents([...events, data[0]]); // Ensure data is added to UI
      setShowAddModal(false); // Close modal after adding event
    }
  };
  

  return (
    <div className="p-5">
      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
            <h2 className="text-xl font-bold mb-4">Admin Login</h2>
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 border rounded mb-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 border rounded mb-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignIn} className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700">
              Sign In
            </button>
          </div>
        </div>
      )}

      {user && (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Admin Dashboard</h2>
            <button onClick={handleSignOut} className="bg-red-500 text-white px-4 py-2 rounded">Sign Out</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <div key={event.id} className="p-4 border rounded-lg shadow-md">
                <img src={event.image} alt={event.title} className="w-full h-40 object-cover rounded-md" />
                <h3 className="text-lg font-semibold mt-2">{event.title}</h3>
                <p className="text-sm text-gray-600">{event.date} at {event.time}</p>
                <p className="text-sm text-gray-600">{event.location}</p>
                <p className="text-sm mt-2">{event.description}</p>
                <button onClick={() => handleDelete(event.id)} className="mt-3 bg-red-500 text-white px-3 py-1 rounded-md">
                  Delete
                </button>
              </div>
            ))}
          </div>

          {/* Floating Add Event Button */}
          <button onClick={() => setShowAddEventModal(true)} className="fixed bottom-5 right-5 bg-purple-600 text-white text-3xl w-12 h-12 flex items-center justify-center rounded-full shadow-lg hover:bg-purple-700">
            +
          </button>

          {showAddEventModal && (
            <div className="fixed inset-0 p-6 bg-gray-900 bg-opacity-75 flex justify-center items-center">
              <div className="bg-white p-6 rounded-lg shadow-lg w-96 text-center">
                <h2 className="text-xl font-bold mb-4">Add Event</h2>
                {Object.keys(newEvent).map((key) => (
                  <input
                    key={key}
                    type="text"
                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                    className="w-full p-2 border rounded mb-2"
                    value={newEvent[key]}
                    onChange={(e) => setNewEvent({ ...newEvent, [key]: e.target.value })}
                  />
                ))}
                <button onClick={handleAddEvent} className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                  Add Event
                </button>
                <button onClick={() => setShowAddEventModal(false)} className="w-full bg-gray-400 text-white py-2 rounded mt-2">
                  Cancel
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Admin;
