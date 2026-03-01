import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import Eventdetails from "../components/Eventdetails";
import "./Dashboard.css";

// Placeholder list – replace with API data or pass as props when you have it
const defaultEvents = [
  {
    id: 1,
    name: "Tech Meetup",
    location: "Downtown Coffee Shop",
    category: "Technology",
    date: "Saturday, March 2, 2026",
    time: "9:00 AM – 10:30 AM",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    description: "Join local developers and tech enthusiasts for an informal meetup. Share projects, swap ideas, and expand your network. All skill levels welcome.",
  },
  {
    id: 2,
    name: "Community Cleanup",
    location: "Central Park",
    category: "Community",
    date: "Tuesday, March 5, 2026",
    time: "10:00 AM – 12:00 PM",
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800",
    description: "Help keep our park beautiful. We'll provide gloves and bags—just bring your energy and willingness to make a difference. Great for families and groups.",
  },
  {
    id: 3,
    name: "Yoga Class",
    location: "Wellness Center",
    category: "Health",
    date: "Sunday, March 3, 2026",
    time: "8:00 AM – 9:00 AM",
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800",
    description: "A relaxing hour of guided yoga suitable for all levels. Focus on breathing, flexibility, and mindfulness. Mats are available if you don't have one.",
  },
  {
    id: 4,
    name: "Book Club",
    location: "Library",
    category: "Entertainment",
    date: "Thursday, March 7, 2026",
    time: "6:00 PM – 7:30 PM",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
    description: "Monthly discussion of our chosen read. This month we're diving into fiction and memoir. Come share your thoughts and discover your next favorite book.",
  },
  {
    id: 5,
    name: "Networking Event",
    location: "Business District",
    category: "Business",
    date: "Wednesday, March 6, 2026",
    time: "5:00 PM – 7:00 PM",
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    description: "Connect with professionals from various industries. Light refreshments provided. Bring business cards and an open mind—perfect for job seekers and entrepreneurs.",
  },
];

function Find() {
  const [query, setQuery] = useState("");
  const [events] = useState(defaultEvents);
  const [selectedEvent, setSelectedEvent] = useState(null);

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
          <SearchResult events={filteredEvents} onEventClick={setSelectedEvent} />
        </div>
      </div>
      {selectedEvent && (
        <Eventdetails event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
}
export default Find;
