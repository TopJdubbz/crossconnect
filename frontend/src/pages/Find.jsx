import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import "./Dashboard.css";

// Placeholder list – replace with API data or pass as props when you have it
const defaultEvents = [
  {
    id: 1,
    name: "Tech Meetup",
    location: "Downtown Coffee Shop",
    category: "Technology",
  },
  {
    id: 2,
    name: "Community Cleanup",
    location: "Central Park",
    category: "Community",
  },
  {
    id: 3,
    name: "Yoga Class",
    location: "Wellness Center",
    category: "Health",
  },
  { id: 4, name: "Book Club", location: "Library", category: "Entertainment" },
  {
    id: 5,
    name: "Networking Event",
    location: "Business District",
    category: "Business",
  },
];

function Find() {
  const [query, setQuery] = useState("");
  const [events] = useState(defaultEvents);

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
        </div>
      </div>
    </div>
  );
}
export default Find;
