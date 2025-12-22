import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

import logo from '../assets/img/ccd5aa1de7d311728c1c9d56de3c9eebf4eb872a.png';
import myIcon from '../assets/img/Group 91.svg';
import leafIcon from '../assets/img/Group 72.svg';

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const totalSeconds = 3600;
  const progress = sec / totalSeconds;
  
  // 궤도 반지름: 시안의 넓은 느낌을 위해 160 유지
  const radius = 160; 
  const dashArray = 2 * Math.PI * radius; // 약 1005
  const dashOffset = dashArray - (progress * dashArray);

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSec((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const formatTime = (seconds) => {
    const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
    const s = String(seconds % 60).padStart(2, '0');
    return `${h} : ${m} : ${s}`;
  };

  const baseButtonStyle = {
    padding: '15px 0',  
    fontSize: '1.2rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    backgroundColor: '#DFF9CF',
    color: '#000000',
    transition: '0.3s',
    outline: 'none'
  };

  return (
    <div className="app-container">
      <img src={logo} alt="GMT" className="gmt-top-logo" />

      <Link to="/mypage" className="my-profile-top" style={{ textDecoration: 'none' }}>
        <span style={{ color: '#333', fontWeight: 'bold' }}>MY</span>
        <img src={myIcon} alt="Profile" className="user-profile-img" style={{ width: '40px', borderRadius: '50%' }} />
      </Link>

      <main className="timer-main-content" style={{ paddingTop: '100px' }}> 
        <div style={{ position: 'relative', width: '350px', height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          
          <svg width="350" height="350" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
            {/* 가느다란 배경 원 */}
            <circle cx="175" cy="175" r={radius} fill="transparent" stroke="#E8F5E8" strokeWidth="2" />
            
            {/* 가느다란 진행 원 */}
            <circle
              cx="175" cy="175" r={radius}
              fill="transparent"
              stroke="#A8E386"
              strokeWidth="3" 
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>

          {/* 새싹 아이콘 회전 영역 */}
          <div style={{
            position: 'absolute',
            width: '320px',
            height: '320px',
            transform: `rotate(${progress * 360}deg)`,
            transition: 'transform 1s linear',
            zIndex: 5
          }}>
            <img src={leafIcon} alt="leaf" style={{
              position: 'absolute',
              top: '-50px', 
              left: '50%',
              transform: 'translateX(-50%)',
              width: '40px'
            }} />
          </div>

          {/* 숫자 크기를 38px로 줄여 선과의 간격을 넓힘 */}
          <div style={{
            color: '#66A841',
            textShadow: '0 4px 4px rgba(167, 199, 132, 0.25)',
            fontFamily: 'Nunito, sans-serif',
            fontSize: '38px', 
            fontWeight: '800',
            letterSpacing: '3px',
            fontVariantNumeric: 'tabular-nums',
            zIndex: 10
          }}>
            {formatTime(sec)}
          </div>
        </div>

        {/* 버튼 로직 */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '80px', justifyContent: 'center' }}>
          {sec === 0 && !isActive && (
            <button onClick={() => setIsActive(true)} style={{ ...baseButtonStyle, width: '250px' }}>시작하기</button>
          )}
          {isActive && (
            <button onClick={() => setIsActive(false)} style={{ ...baseButtonStyle, width: '250px' }}>멈추기</button>
          )}
          {!isActive && sec > 0 && (
            <>
              <button onClick={() => setIsActive(true)} style={{ ...baseButtonStyle, width: '120px' }}>계속하기</button>
              <button 
                onClick={() => { setIsActive(false); setSec(0); }} 
                style={{ ...baseButtonStyle, width: '120px' }}
              >
                끝내기
              </button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}