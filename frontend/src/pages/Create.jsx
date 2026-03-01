import React from 'react';
import { Link } from "react-router-dom";
import {useState} from "react";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import "./Dashboard.css";
const categories = ["Culture", "Education", "Political", "Sports", "Technology", "Health", "Entertainment"];
const EventForm = () => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState(categories[0]);
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = {
            title,
            description,
            category,
            date,
            time,
            location
        };
        console.log("Event Data:", eventData);
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
                />
            </label>
            <label>
                <textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
            </label>
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
                />
            </label>
            <label>
                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />
            </label>
            <label>
                <input
                    type="text"
                    placeholder="Location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                />
            </label>
            </div>
            <Button text="Create Event" />
        </form>
    );
}

function Create(){
    return(
        <div className="dashboard">
            <div className = 'main-content'>
                <Navbar />
                <h1>Welcome to the Create page</h1>
                <p>This is where you can create new content and manage your settings.</p>
                <EventForm />
            </div>
        </div>
    );
}
export default Create;