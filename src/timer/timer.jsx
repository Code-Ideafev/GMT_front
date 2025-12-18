import React, { useEffect, useState } from 'react';

function Timer() {
  const [sec, setSec] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSec(prev => prev + 1);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (sec) => {
    const hours = String(Math.floor(sec / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((sec % 3600) / 60)).padStart(2, '0');
    const seconds = String(sec % 60).padStart(2, '0');
    return `${hours} : ${minutes} : ${seconds}`;
  }

  return (
    <div style={{ fontSize: '2rem', color: '#7DBA7D', textAlign: 'center' }}>
      {formatTime(sec)}
    </div>
  );
}

export default Timer;
