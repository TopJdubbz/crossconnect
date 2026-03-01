import React, { useState, useEffect } from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import ListSection from "../components/ListSection";
import Dither from "../components/Dither";
import { fallbackEvents } from "../data/fallbackEvents";

function Dashboard() {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatTime = (timeString) => {
    const date = new Date(timeString);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    const hh = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd} ${hh}:${min}`;
  };

  useEffect(() => {
    const fetchUpcomingEvents = async () => {
      try {
        // Explicitly pointing to the Flask server on port 5000
        const response = await fetch("/getUpcomingEvents");

        if (!response.ok) {
          throw new Error("Failed to fetch upcoming events");
        }

        const data = await response.json();
        if (!Array.isArray(data)) throw new Error("Invalid response");
        setUpcomingEvents(data);
        setError(null);
      } catch (err) {
        setError(err.message);
        setUpcomingEvents(fallbackEvents.slice(0, 10));
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
        <div
          style={{
            width: "100%",
            height: "100px",
            position: "relative",
            marginBottom: "20px",
          }}
        >
          <Dither
            waveColor={[0.5, 0.5, 0.5]}
            disableAnimation={false}
            enableMouseInteraction
            mouseRadius={0.3}
            colorNum={4}
            waveAmplitude={0.3}
            waveFrequency={3}
            waveSpeed={0.05}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <span
              style={{
                color: "white",
                fontSize: "1.25rem",
                fontWeight: 600,
                textShadow: "0 1px 2px rgba(0,0,0,0.5)",
              }}
            >
              Where people and moments connect.
            </span>
          </div>
        </div>
        {/* <div className="section-title">
          <h2>Your events</h2>
          <div className="your-events" />
          <ListSection />
        </div> */}

        <div className="section-title">
          <h2>Upcoming events</h2>
          <div className="upcoming-events">
            {loading && <p>Loading events...</p>}
            {error && (
              <p style={{ color: "#f0ad4e", marginBottom: 8 }}>
                Backend unavailable — showing cached events.
              </p>
            )}

            {!loading && upcomingEvents.length === 0 && (
              <p>There are no new upcoming events</p>
            )}

            {upcomingEvents.length > 0 && (
              <ul>
                {upcomingEvents.map((event) => (
                  <li key={event.id}>
                    <strong>{event.name}</strong> - {formatTime(event.time)}
                    <br />
                    Location: {event.location} | Category: {event.category}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/* <Link to="/test">Calendar test page</Link> */}
      </div>
    </div>
  );
}

export default Dashboard;
