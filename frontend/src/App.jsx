import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Test from "./pages/Test";
import Dashboard from "./pages/Dashboard";
import Create from "./pages/Create";

function App() {
  // Fetch data from backend
  const [data, setData] = useState(null);
 
  // useEffect(() => {
  //   fetch("http://localhost:5000/api/data")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message))
  //     .catch((err) => console.log(err));
  // }, []);
 
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/test" element={<Test />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}

export default App;