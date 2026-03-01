import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import EventMap from "../components/map";
import "./Dashboard.css";
import "./Find.css";
import Eventdetails from "../components/Eventdetails";
import { fallbackEvents } from "../data/fallbackEvents";

const normalizeEvents = (events) =>
  events.map((e) => ({ ...e, category: e.category ?? e.interest }));

function Find() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const fetchEventsByCategory = async () => {
      try {
        if (query.trim() === "") {
          const response = await fetch("/getUpcomingEvents");
          if (response.ok) {
            const data = await response.json();
            setEvents(normalizeEvents(Array.isArray(data) ? data : fallbackEvents));
          } else {
            setEvents(fallbackEvents);
          }
          return;
        }

        const url = `/getEvents?event_category=${encodeURIComponent(query)}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          setEvents(normalizeEvents(Array.isArray(data) ? data : fallbackEvents));
        } else {
          const filtered = fallbackEvents.filter(
            (e) => e.category?.toLowerCase().includes(query.toLowerCase())
          );
          setEvents(filtered);
        }
      } catch (error) {
        console.error("Failed to fetch events from backend:", error);
        if (query.trim() === "") {
          setEvents(fallbackEvents);
        } else {
          const filtered = fallbackEvents.filter(
            (e) => e.category?.toLowerCase().includes(query.toLowerCase())
          );
          setEvents(filtered);
        }
      }
    };

    fetchEventsByCategory();
  }, [query]); 

return (
    <div className="dashboard">
      <div className="main-content">
        <Navbar />
        <div className="find-header" style={{ padding: "20px 0" }}>
          <h1>Find Events</h1>
          <p>Discover events happening around you and connect with like-minded individuals.</p>
        </div>
        
        <div className="split-layout">
          
          <div className="left-panel">
            <div className="clean-find-container">
              <h2>Events near you</h2>
              <Search
                value={query}
                onChange={setQuery}
                placeholder="Search by category..." 
              />
              <SearchResult events={events} onEventClick={setSelectedEvent} />
            </div>
          </div>

          <div className="right-panel">
            <div className="map-wrapper">
              <EventMap events={events} />
            </div>
          </div>

        </div>
      </div>
      {selectedEvent && (
        <Eventdetails
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}

export default Find;