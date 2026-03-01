import React from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div>
      <h1> Dashboard</h1>
      <div className="your-events" />
      <p>There are no new upcoming events</p>
      <div className="upcoming-events" />
      <p>There are no new upcoming events</p>

      <Link to="/test">Calendar test page</Link>
    </div>
  );
}

export default Dashboard;
