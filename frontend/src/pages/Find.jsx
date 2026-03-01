import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
// FIXED: Imported your map component and named it EventMap so the tag at the bottom works!
import EventMap from "../components/map"; 
import "./Dashboard.css";
import "./Find.css";

function Find() {
  const [events, setEvents] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchEventsByCategory = async () => {
      try {
        if (query.trim() === "") {
          const response = await fetch("http://127.0.0.1:5000/getUpcomingEvents");
          if (response.ok) {
            const data = await response.json();
            setEvents(data);
          }
          return; 
        }

        const url = `http://127.0.0.1:5000/getEvents?event_category=${query}`;
        const response = await fetch(url);
        
        if (response.ok) {
          const data = await response.json();
          setEvents(data);
        }
      } catch (error) {
        console.error("Failed to fetch events from backend:", error);
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
              <SearchResult events={events} />
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