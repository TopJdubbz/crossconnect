import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import Test from "./pages/Test";
import Dashboard from "./pages/Dashboard";

function App() {
  //Fetch data from app.py connecting frontend to backend
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/data")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      {/* <div className="Cross Connect">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          <Link to="/test">Calendar test page</Link>
        </header>
        <div></div>
      </div> */}
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/test" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
