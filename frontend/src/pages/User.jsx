import React from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import CalendarComponent from "../components/Calendar";

// Example user data (replace with real data when connected to backend/auth)
const exampleUser = {
  fullName: "Jane Smith",
  email: "jane.smith@example.com",
  zipCode: "95112",
  phone: "(408) 555-0123",
  address: "123 Main St, San Jose, CA",
};

// Example events the user has joined (for calendar)
const exampleJoinedEvents = [
  {
    title: "Tech Meetup",
    start: new Date(2026, 2, 2, 9, 0),
    end: new Date(2026, 2, 2, 10, 30),
  },
  {
    title: "Yoga Class",
    start: new Date(2026, 2, 3, 8, 0),
    end: new Date(2026, 2, 3, 9, 0),
  },
  {
    title: "Book Club",
    start: new Date(2026, 2, 5, 18, 0),
    end: new Date(2026, 2, 5, 19, 30),
  },
  {
    title: "Networking Event",
    start: new Date(2026, 2, 7, 17, 0),
    end: new Date(2026, 2, 7, 19, 0),
  },
];

function User() {
  return (
    <div className="dashboard">
      <div className="main-content">
        <Navbar />
        <h1>My Profile</h1>
        <section style={{ marginBottom: 32 }}>
          <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>
            Account information
          </h2>
          <div
            style={{
              background: "#fff",
              padding: 20,
              borderRadius: 10,
              boxShadow: "0 2px 5px rgba(0,0,0,0.08)",
              maxWidth: 480,
            }}
          >
            <p style={{ margin: "8px 0" }}>
              <strong>Full name:</strong> {exampleUser.fullName}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Email:</strong> {exampleUser.email}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Zip code:</strong> {exampleUser.zipCode}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Phone:</strong> {exampleUser.phone}
            </p>
            <p style={{ margin: "8px 0" }}>
              <strong>Address:</strong> {exampleUser.address}
            </p>
          </div>
        </section>
        <section>
          <h2 style={{ fontSize: "1.25rem", marginBottom: 12 }}>My Calendar</h2>
          <CalendarComponent events={exampleJoinedEvents} />
        </section>
      </div>
    </div>
  );
}

export default User;
