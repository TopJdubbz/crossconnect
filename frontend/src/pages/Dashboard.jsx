import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import ListSection from "../components/ListSection";

function Dashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        // Explicitly pointing to the Flask server on port 5000
        const response = await fetch("http://127.0.0.1:5000/getUpcomingEvents");
        
        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }
        
        const data = await response.json();
        setUpcomingEvents(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUpcomingEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUpcomingEvents();
  }, []);

  return (
    <div className="dashboard">
      <div className="main-content">
        <Navbar />
        <div className="section-title">
          <h2>Your events</h2>
          <div className="your-events" />
          <ListSection />
        </div>
        
        <div className="section-title">
          <h2>Upcoming events</h2>
          <div className="upcoming-events">
            {loading && <p>Loading events...</p>}
            {error && <p style={{ color: "red" }}>Error: {error}</p>}
            
            {!loading && upcomingEvents.length === 0 && (
              <p>There are no new upcoming events</p>
            )}
            
            {upcomingEvents.length > 0 && (
              <ul>
                {upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <strong>{event.name}</strong> - {event.time}
                    <br />
                    Location: {event.location} | Category: {event.category}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        <Link to="/test">Calendar test page</Link>
      </div>
    </div>
  );
}

export default Dashboard;