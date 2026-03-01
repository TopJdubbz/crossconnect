import React from "react";
import { Link } from "react-router-dom";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import ListSection from "../components/ListSection";
function Dashboard() {
  return (
    <div className="dashboard">
      <div className="main-content">
        <Navbar />
        <div className="section-title">
          <h2>Your events</h2>
          <div className="your-events" />
          <ListSection />
        </div>
        <div className="section-title">
          <h2>Upcoming events</h2>
          <div className="upcoming-events" />
          <p>There are no new upcoming events</p>
        </div>
        <Link to="/test">Calendar test page</Link>
      </div>
    </div>
  );
}

export default Dashboard;
