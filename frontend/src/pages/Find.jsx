import React, { useState } from "react";
import Navbar from "../components/Navbar";
import EventMap from "../components/map";
import Search from "../components/Search";
import SearchResult from "../components/SearchResult";
import Eventdetails from "../components/Eventdetails";
import "./Dashboard.css";

// Fake data for Find page (API calling code commented out below)
const defaultEvents = [
  {
    id: 1,
    name: "Tech Meetup",
    location: "2221 The Alameda, Santa Clara, CA 95050",
    category: "Technology",
    date: "Saturday, March 2, 2026",
    time: "9:00 AM – 10:30 AM",
    lat: 37.351,
    lng: -121.985,
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800",
    description: "Join local developers and tech enthusiasts for an informal meetup. Share projects, swap ideas, and expand your network. All skill levels welcome.",
  },
  {
    id: 2,
    name: "Community Cleanup",
    location: "Central Park, New york, NY 10022",
    category: "Community",
    date: "Tuesday, March 5, 2026",
    time: "10:00 AM – 12:00 PM",
    lat: 40.7829,
    lng: -73.9654,
    image: "https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?w=800",
    description: "Help keep our park beautiful. We'll provide gloves and bags—just bring your energy and willingness to make a difference. Great for families and groups.",
  },
  {
    id: 3,
    name: "Yoga Class",
    location: "852 Market Street, 852 Market St, Santa Clara, CA 95050",
    category: "Health",
    date: "Sunday, March 3, 2026",
    time: "8:00 AM – 9:00 AM",
    lat: 37.354,
    lng: -121.9855,
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
    lat: 37.3522,
    lng: -121.9848,
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800",
    description: "Monthly discussion of our chosen read. This month we're diving into fiction and memoir. Come share your thoughts and discover your next favorite book.",
  },
  {
    id: 5,
    name: "Networking Event",
    location: "350 W Santa Clara St, San Jose, CA 95113",
    category: "Business",
    date: "Wednesday, March 6, 2026",
    time: "5:00 PM – 7:00 PM",
    lat: 37.3344,
    lng: -121.89,
    image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800",
    description: "Connect with professionals from various industries. Light refreshments provided. Bring business cards and an open mind—perfect for job seekers and entrepreneurs.",
  },
  {
    id: 6,
    name: "Startup Pitch Night",
    location: "1 Market St, San Jose, CA 95113",
    category: "Technology",
    date: "Friday, March 8, 2026",
    time: "6:00 PM – 9:00 PM",
    lat: 37.3349,
    lng: -121.8936,
    image: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800",
    description: "Watch local startups pitch to investors. Great for founders, angels, and anyone curious about the startup scene. Networking and drinks after.",
  },
  {
    id: 7,
    name: "Salsa Night",
    location: "88 E San Fernando St, San Jose, CA 95113",
    category: "Entertainment",
    date: "Saturday, March 9, 2026",
    time: "8:00 PM – 11:00 PM",
    lat: 37.3352,
    lng: -121.8882,
    image: "https://images.unsplash.com/photo-1547153760-18fc949bc42e?w=800",
    description: "Beginner-friendly salsa night with a short lesson and open dancing. No partner required. Live band and DJ.",
  },
  {
    id: 8,
    name: "Farmers Market & Wellness Fair",
    location: "Lincoln Ave & Murphy Ave, Sunnyvale, CA 94086",
    category: "Health",
    date: "Sunday, March 10, 2026",
    time: "9:00 AM – 1:00 PM",
    lat: 37.3688,
    lng: -122.0365,
    image: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800",
    description: "Local produce, food trucks, and wellness booths. Free yoga at 10 AM and mini health screenings. Family and pet friendly.",
  },
  {
    id: 9,
    name: "Code & Coffee",
    location: "2710 Walsh Ave, Santa Clara, CA 95051",
    category: "Technology",
    date: "Saturday, March 9, 2026",
    time: "10:00 AM – 12:00 PM",
    lat: 37.3772,
    lng: -121.9698,
    image: "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800",
    description: "Casual coding session with free coffee. Work on side projects, pair program, or just chat with other devs. Bring your laptop.",
  },
  {
    id: 10,
    name: "Art Walk San Jose",
    location: "South First Street, San Jose, CA 95113",
    category: "Entertainment",
    date: "Friday, March 8, 2026",
    time: "6:00 PM – 10:00 PM",
    lat: 37.3322,
    lng: -121.8834,
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800",
    description: "Monthly art walk through downtown galleries and pop-ups. Meet artists, enjoy live music, and explore local creativity.",
  },
];

// API calling code – commented out for now; use defaultEvents above.
// function useReceiveEvents() {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   useEffect(() => {
//     const fetchEvents = async () => {
//       try {
//         const response = await fetch("http://127.0.0.1:5000/getEvents");
//         if (!response.ok) throw new Error("Failed to fetch events");
//         const data = await response.json();
//         setEvents(Array.isArray(data) ? data : []);
//         setError(null);
//       } catch (err) {
//         setError(err.message);
//         setEvents([]);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchEvents();
//   }, []);
//   return { events, loading, error };
// }

function Find({ events: initialEvents }) {
  const [query, setQuery] = useState("");
  const events = (initialEvents?.length ? initialEvents : defaultEvents) ?? [];
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
        <div className="find-map-container" style={{ marginBottom: 24 }}>
          <EventMap events={filteredEvents} />
        </div>
        <div className="find-container">
          <h1>Events near you</h1>
          <Search
            value={query}
            onChange={setQuery}
            placeholder="Start typing to search..."
          />
          <SearchResult
            events={filteredEvents}
            onEventClick={setSelectedEvent}
          />
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
