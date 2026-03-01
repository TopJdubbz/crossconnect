import React, { useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import ListSection from './components/ListSection';

function App() {
  //Fetch data from app.py connecting frontend to backend
  const [data, setData] = useState(null);
  useEffect(() => {
    fetch('http://localhost:5000/api/data')
      .then(res => res.json())
      .then(data => setData(data.message))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="App">
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
      </header>
      <div>
      <ListSection/>
      </div>
    </div>
  );
}

export default App;
