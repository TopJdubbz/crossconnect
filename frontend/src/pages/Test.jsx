import React from "react";
import { Link } from "react-router-dom";
import CalendarComponent from "../components/Calendar";
import ButtonComponent from "../components/Button";
import SearchComponent from "../components/Search";

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
      <h1>Button test</h1>
      <ButtonComponent
        text="Test Button"
        onClick={() => alert("Button clicked!")}
      />
      <h1>Calendar test</h1>
      <p>Use the calendar below to try month, week, and agenda views.</p>
      <CalendarComponent events={sampleEvents} />
      <h1>Search test</h1>
      <SearchComponent />
      <br></br>
      <Link to="/">← Back to home</Link>
    </div>
  );
}

export default Test;
