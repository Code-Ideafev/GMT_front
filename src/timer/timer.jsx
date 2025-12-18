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
  const dashArray = 1005; 
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

  // 버튼 스타일 정의
  const baseButtonStyle = {
    padding: '15px 0',
    fontSize: '1.2rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    backgroundColor: '#7DBA7D',
    color: '#FFFFFF',
    transition: '0.3s'
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
            <circle cx="175" cy="175" r="160" fill="transparent" stroke="#E8F5E8" strokeWidth="4" />
            <circle
              cx="175" cy="175" r="160"
              fill="transparent"
              stroke="#7DBA7D"
              strokeWidth="6" 
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>

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

          <div style={{
            fontFamily: "'Nunito', sans-serif",
            fontWeight: '800',
            fontSize: '54px',
            color: '#7DBA7D',
            zIndex: 10
          }}>
            {formatTime(sec)}
          </div>
        </div>

        {/* --- 버튼 로직 섹션 --- */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '80px', justifyContent: 'center' }}>
          
          {/* 1단계: 아직 시작 안 했을 때 (0초일 때) */}
          {sec === 0 && !isActive && (
            <button 
              onClick={() => setIsActive(true)} 
              style={{ ...baseButtonStyle, width: '250px' }}
            >
              시작하기
            </button>
          )}

          {/* 2단계: 가동 중일 때 (무조건 멈추기만 보임) */}
          {isActive && (
            <button 
              onClick={() => setIsActive(false)} 
              style={{ ...baseButtonStyle, width: '250px' }}
            >
              멈추기
            </button>
          )}

          {/* 3단계: 가동 중이 아닌데 시간이 흐른 상태 (일시정지/계속하기/끝내기) */}
          {!isActive && sec > 0 && (
            <>
              <button 
                onClick={() => setIsActive(true)} 
                style={{ ...baseButtonStyle, width: '120px' }}
              >
                계속하기
              </button>
              <button 
                onClick={() => {
                  setIsActive(false);
                  setSec(0); // 0으로 만들면 다시 '시작하기' 버튼이 뜹니다.
                }} 
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