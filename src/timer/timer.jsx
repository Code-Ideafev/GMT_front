import React, { useEffect, useState } from 'react';
import '../App.css';
import { Link } from 'react-router-dom';

import logo from '../assets/img/ccd5aa1de7d311728c1c9d56de3c9eebf4eb872a.png';
import myIcon from '../assets/img/Group 91.svg';
import leafIcon from '../assets/img/Group 72.svg';

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const progress = (sec % 3600) / 3600;
const circumference = 2 * Math.PI * 160; 
const rotationDegree = progress * 360;


  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => {
        setSec(prev => prev + 1);
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

  return (
    <div className="app-container">
      {/* 로고 영역 */}
      <img src={logo} alt="GMT" className="gmt-top-logo" />

    <Link to="/mypage" className="my-profile-top" style={{ textDecoration: 'none' }}>
  <span style={{ color: '#333', fontWeight: 'bold' }}>MY</span>
  <img src={myIcon} alt="Profile" className="user-profile-img" style={{ width: '40px', borderRadius: '50%' }} />
</Link>

      <main className="timer-main-content">
  <div style={{position: 'relative', width: '350px', height: '350px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
    
    {/* 가이드 선 */}
    <div style={{position: 'absolute', width: '320px', height: '320px', border: '2px solid #E8F5E8', borderRadius: '50%'}}></div>

  
    
    {/* 회전하는 새싹 */}
    <div style={{position: 'absolute', width: '320px', height: '320px', transform: `rotate(${rotationDegree}deg)`, transition: 'transform 1s linear'}}>
      <img src={leafIcon} alt="leaf" style={{position: 'absolute', top: '-45px', left: '50%', transform: 'translateX(-50%)', width: '40px'}} />
    </div>

    {/* 가이드 수치 적용 (64px -> 선 내부 안착을 위해 54px 권장하지만, 가이드대로 64px 적용 시) */}
    <div style={{
      fontFamily: 'Nunito, sans-serif', /* Nunito 폰트가 없으면 기본 샌드세리프 */
      fontWeight: '700',                /* ExtraBold */
      fontSize: '50px',                 /* 가이드 크기 */
      lineHeight: '100%',               /* 가이드 라인하이트 */
      color: '#7DBA7D',
      width: '297px',                   /* 가이드 너비 */
      height: '87px',                  /* 가이드 높이 */
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      letterSpacing: '0%',
      zIndex: 5
    }}>
      {formatTime(sec)}
    </div>
    
  </div>

        <button 
          onClick={() => setIsActive(!isActive)}
          style={{
            padding: '15px 100px', fontSize: '1.2rem', fontWeight: 'bold', border: 'none', borderRadius: '12px', cursor: 'pointer',
            backgroundColor: isActive ? '#FFE8E8' : '#E9F7E9', color: isActive ? '#D63031' : '#444'
          }}
        >
          {isActive ? '멈추기' : '시작하기'}
        </button>
      </main>
    </div>
  );
}