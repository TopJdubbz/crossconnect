import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./Dashboard.css";
function Find() {
    return (
        <div className="dashboard"> 
            <div className = 'main-content'>
                <Navbar />
                <h1>Find Events</h1>
                <p>Discover events happening around you and connect with like-minded individuals.</p>
                <div className = "find-container">
                    <h1>Search for Events</h1>
                    <input type="text" placeholder="Search for events..." className="search-input"/>
                    <button className="search-button">Search</button>
                </div>
            </div>
        </div>
    );
}
export default Find;