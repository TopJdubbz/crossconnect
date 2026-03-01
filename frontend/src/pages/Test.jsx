import React from "react";
import { Link } from "react-router-dom";
import CalendarComponent from "../components/Calendar";
import ButtonComponent from "../components/Button";
import SearchComponent from "../components/Search";
import Dither from "../components/Dither";

// const [events, setEvents] = useState([]);
// const [loading, setLoading] = useState(true);
// const [error, setError] = useState(null);

// useEffect(() => {
//   fetch("http://localhost:5000/api/events")
//     .then((res) => {
//       if (!res.ok) throw new Error("Failed to fetch events");
//       return res.json();
//     })
//     .then((data) => {
//       // Map API shape to calendar shape: { start, end, title }
//       const mapped = (data.events || data).map((e) => ({
//         ...e,
//         start: new Date(e.start),
//         end: new Date(e.end),
//         title: e.title ?? e.name,
//       }));
//       setEvents(mapped);
//     })
//     .catch((err) => setError(err.message))
//     .finally(() => setLoading(false));
// }, []);

// Sample events to test calendar functionality
const sampleEvents = [
  {
    title: "Team standup",
    start: new Date(2026, 1, 28, 9, 0),
    end: new Date(2026, 1, 28, 9, 30),
  },
  {
    title: "Lunch with Sarah",
    start: new Date(2026, 1, 28, 12, 0),
    end: new Date(2026, 1, 28, 13, 0),
  },
  {
    title: "Project review",
    start: new Date(2026, 1, 28, 14, 0),
    end: new Date(2026, 1, 28, 15, 30),
  },
  {
    title: "Workshop",
    start: new Date(2026, 2, 1, 10, 0),
    end: new Date(2026, 2, 1, 12, 0),
  },
  {
    title: "Coffee chat",
    start: new Date(2026, 2, 3, 15, 0),
    end: new Date(2026, 2, 3, 15, 45),
  },
];

function Test() {
  return (
    <div style={{ padding: "24px" }}>
      <Link to="/">← Back to home</Link>
      <h1>Dither test</h1>
      <div style={{ width: "100%", height: "200px", position: "relative" }}>
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
      </div>
      <h1>Button test</h1>
      <ButtonComponent
        text="Test Button"
        onClick={() => alert("Button clicked!")}
      />
      <h1>Calendar test</h1>
      <p>Use the calendar below to try month, week, and agenda views.</p>
      <CalendarComponent events={sampleEvents} />
      {/* {loading && <p>Loading events…</p>}
      {error && <p>Error: {error}</p>}
      <CalendarComponent events={events} /> */}
      <h1>Search test</h1>
      <SearchComponent />
      <br></br>
      <Link to="/">← Back to home</Link>
    </div>
  );
}

export default Test;
