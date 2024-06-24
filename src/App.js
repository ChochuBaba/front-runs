  import React, { useState } from 'react';
  import { useEffect } from 'react'; 
  import './App.css'
  import '@fortawesome/fontawesome-free/css/all.min.css';

  function App() {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [avg, setAvg]=useState(1);
    const [latestRuns, setLatestRuns] = useState([]);

    useEffect(() => 
      {
        let intervalId;

        if (isActive) {
            intervalId = setInterval(() => {
                setTime(prevTime => prevTime + 1);
            }, 1000);
        } else {
            clearInterval(intervalId);
        }

          return () => clearInterval(intervalId);
      }, [isActive]);
      
      useEffect(() => {
        fetchLatestRuns();
    }, []);

    const fetchLatestRuns = async () => {
      try {
          const response = await fetch('https://back-runs.onrender.com/runs/latest');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setLatestRuns(data);
      } catch (error) {
          console.error('Error:', error);
      }
  };

    const handleReset = async () => {
      setIsActive(false);
      setAvg(time / count); // Calculate the average before resetting count and time
  
      try {
          const response = await fetch('https://back-runs.onrender.com/runs', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  count: count,
                  time: time,
                  avg: time / count // Use time / count to calculate the average
              })
          });
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          console.log('Success:', data);
      } catch (error) {
          console.error('Error:', error);
      }
  
      setTime(0);
      setCount(0);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} minutes ${seconds} seconds`;
  };

  const handleToggle = () => {
    setIsActive(!isActive);
  };
  

    return (
       <div className="container">
      
      <div className="row-container">
        <button
          onClick={handleToggle}
          className={`toggle-button ${isActive ? 'pause' : 'start'}`}
        >
          <i className={`fas ${isActive ? 'fa-pause' : 'fa-play'}`}></i>
        </button>
        <h1 className="time" style={{ color: 'white '}}>
          <span className="bold-time">{time}</span> seconds
        </h1>

      </div>

      <button onClick={handleReset}>Reset</button>
      <br />
      <button id="tapButton" onClick={() => setCount(count + 1)}>
        tap
      </button>
      <h2>Average is : {avg}</h2>
      <h3>Last 5 Runs:</h3>
      <ul className="runs">
        {latestRuns.map((run, index) => (
          <li key={index}>
            Count: {run.count}, Time: {formatTime(run.time)}, Avg: {run.avg}, Date: {new Date(run.createdAt).toLocaleDateString()}
          </li>
        ))}
      </ul>

    </div>
    );
  }

  export default App;
