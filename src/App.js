  import React, { useState } from 'react';
  import { useEffect } from 'react';

  function App() {
    const [count, setCount] = useState(0);
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [avg, setAvg]=useState(1);

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

    const handleStart = () => {
        setAvg(1);
        setIsActive(true);
    };

    const handleStop = () => {
        setIsActive(false);
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
  

    return (
      <div>
      <h1 style={{ color: isActive ? 'green' : 'red' }}>Timer: {time} seconds</h1>
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <br></br>
      <button style={{ fontSize: '12rem', color:'blue' }} onClick={() => setCount(count + 1)}>
        tap
      </button>
        <h2>Average is : {avg}</h2>
      </div>
    );
  }

  export default App;
