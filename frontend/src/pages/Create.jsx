import React, { useState } from 'react';
import { useNavigate } from "react-router-dom"; // Added for redirecting!
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import "./Dashboard.css";

const categories = ["Culture", "Education", "Political", "Sports", "Technology", "Health", "Entertainment"];

const EventForm = () => {
    const navigate = useNavigate(); // Initialize the navigator

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const combinedDateTime = `${date}T${time}:00`;

        const payload = {
            name: title,
            location: location,
            category: category,
            time: combinedDateTime
        };

        try {
            const response = await fetch("http://127.0.0.1:5000/addEvent", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                navigate("/find"); 
            } else {
                console.error("Failed to save event to the database.");
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="event-form">
            <div className="input-group">
            <label>
                <input
                    type="text"
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </label>
            {/* <label>
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label> */}
            <label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}>
                    {categories.map((cat) => (
                        <option key={cat} value={cat}>{cat}</option>
                    ))}
                </select>
            </label>
            <label>
                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    required
                />
            </label>
            <label>
                <input
                    type="text"
                    placeholder="Location (e.g., 1 Washington Sq, San Jose)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />
            </label>
            </div>
            
            <button type="submit" className="submit-btn">Create Event</button>
        </form>
    );
}

function Create(){
    return(
        <div className="dashboard">
            <div className='main-content'>
                <Navbar />
                <h1>Welcome to the Create page</h1>
                <p>Host an event and connect with the community.</p>
                <EventForm />
            </div>
        </div>
    );
}
export default Create;
