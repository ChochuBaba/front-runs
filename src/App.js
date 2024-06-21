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
        setAvg(time/count)
        setIsActive(false);
        
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
