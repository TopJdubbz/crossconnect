import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import map from "../components/map";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import "./Dashboard.css";

// Placeholder list – replace with API data or pass as props when you have it
/* const defaultEvents = [
  {
    id: 1,
    name: "Tech Meetup",
    location: "2221 The Alameda, Santa Clara, CA 95050",
    category: "Technology",
  },
  {
    id: 2,
    name: "Community Cleanup",
    location: "Central Park, New york, NY 10022",
    category: "Community",
  },
  {
    id: 3,
    name: "Yoga Class",
    location: "852 Market Street, 852 Market St, Santa Clara, CA 95050",
    category: "Health",
  },
  { id: 4, name: "Book Club", location: "500 El Camino Real, Santa Clara, CA 95050", category: "Entertainment" },
  {
    id: 5,
    name: "Networking Event",
    location: "350 W Santa Clara St, San Jose, CA 95113",
    category: "Business",
  },
]; */

//Receives events from the SQL database. events.name events.catgory events.datetime events.lat events.lng
function receiveEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
  const fetchEvents = async () => {
    try {const response = await fetch("http://127.0.0.1:5000/getEvents");
    if (!response.ok) {
      throw new Error("Failed to fetch events");
    }
    const data = await response.json();
    setEvents(data);
    setError(null);
  } catch (err) {
        setError(err.message);
        setEvents([]);
      } finally {
        setLoading(false);
      }
  };
  fetchEvents();
}, []);

  return events;

}

function Find({ events }) {
  const [EventsResult, setEventsResult] = useState([]);
  const [query, setQuery] = useState("");
  //const [eventsList, setEventsList] = useState(events);

  const filteredEvents = events.filter((event) => {
    const searchLower = query.trim().toLowerCase();
    if (!searchLower) return true;
    const name = (event.name || "").toLowerCase();
    const location = (event.location || "").toLowerCase();
    const category = (event.category || "").toLowerCase();

    return (
      name.includes(searchLower) ||
      location.includes(searchLower) ||
      category.includes(searchLower)
    );
  });

  return (
    <div className="dashboard">
      <div className="main-content">
        <Navbar />
        <h1>Find Events</h1>
        <p>
          Discover events happening around you and connect with like-minded
          individuals.
        </p>
        <div className="find-container">
          <h1>Events near you</h1>
          <Search
            value={query}
            onChange={setQuery}
            placeholder="Start typing to search..."
          />
          <SearchResult events={filteredEvents} />
        <div className="map-container">
          <EventMap events={filteredEvents} />
        </div>
        </div>
      </div>
    </div>
  );
}
export default Find;
