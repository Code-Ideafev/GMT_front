import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../App.css";

import logo from "../assets/img/GMT.png";
import myIcon from "../assets/img/Group91.svg";
import leafIcon from "../assets/img/Group72.svg";

export default function Timer() {
  const [sec, setSec] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // ---------------------------------------------------------
  // [추가] 타이머 페이지 전용 탭 제목 및 파비콘 설정
  // ---------------------------------------------------------
  useEffect(() => {
    // 1. 탭 제목 변경
    document.title = "타이머";

    // 2. 파비콘 업데이트 로직
    const updateFavicon = () => {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'shortcut icon';
      // 수정한 viewBox 설정을 브라우저가 즉시 반영하도록 쿼리스트링(?v=20)을 붙입니다.
      document.getElementsByTagName('head')[0].appendChild(link);
    };

    updateFavicon();
  }, []); // 컴포넌트 마운트 시 1번 실행
  // ---------------------------------------------------------

  // 1. 요청하신 12가지 무지개 색상
  const colorList = [
    "#DC4444", "#EDC965", "#F3E952", "#B7E5A4",
    "#87D9CF", "#50CBF1", "#7C9CFF", "#4A63C6",
    "#9867D5", "#ED73E3", "#E24A9E", "#DAA4A5",
  ];

  // 2. [색상 로직] 24시간(3600초)을 12구간으로 나눔
  const colorInterval = Math.floor(sec / 7200) % 12;
  const nextColorInterval = (colorInterval + 1) % 12;

  // 3. [회전 로직] 원은 "1시간(3600초)" 마다 한 바퀴씩 회전
  const rotationProgress = (sec % 3600) / 3600;

  const radius = 190;
  const dashArray = 2 * Math.PI * radius;
  const dashOffset = dashArray - (rotationProgress * dashArray);

  const handleFinish = () => {
    const h = Math.floor(sec / 3600);
    const m = Math.floor((sec % 3600) / 60);
    const s = sec % 60;
    const timeMessage = h > 0 ? `${h}시간 ${m}분 ${s}초` : m > 0 ? `${m}분 ${s}초` : `${s}초`;
    window.alert(`오늘 총 ${timeMessage} 동안 열공하셨네요! 고생하셨습니다. 🌱`);
    setIsActive(false);
    setSec(0);
  };

  useEffect(() => {
    let timer = null;
    if (isActive) {
      timer = setInterval(() => setSec((p) => p + 1), 1000);
    }
    return () => clearInterval(timer);
  }, [isActive]);

  const formatTime = (s) => {
    const h = String(Math.floor(s / 3600)).padStart(2, "0");
    const m = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${h} : ${m} : ${ss}`;
  };

  return (
    <div className="app-container">
      <img src={logo} alt="GMT" className="gmt-top-logo" />
      <Link to="/mypage" className="my-profile-top">
        <span className="my-text">MY</span>
        <img src={myIcon} alt="Profile" className="user-profile-img" />
      </Link>

      <main className="timer-main-content">
        <div className="timer-circle-wrapper">
          <svg width="420" height="420" viewBox="0 0 420 420">
            <defs>
              <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={colorList[colorInterval]} />
                <stop offset="100%" stopColor={colorList[nextColorInterval]} />
              </linearGradient>
            </defs>
            <circle cx="210" cy="210" r={radius} fill="none" stroke="#F0F0F0" strokeWidth="1" />
            <circle
              cx="210" cy="210" r={radius}
              className="circle-progress"
              stroke="url(#timerGradient)"
              strokeDasharray={dashArray}
              strokeDashoffset={dashOffset}
              strokeWidth="2"
              strokeLinecap="round"
              transform="rotate(-90 210 210)"
              fill="none"
            />
          </svg>

          <div
            className="leaf-container"
            style={{ transform: `rotate(${rotationProgress * 360}deg)` }}
          >
            <img src={leafIcon} alt="leaf" className="leaf-img" />
          </div>
          <div className="time-number-text">{formatTime(sec)}</div>
        </div>

        <div className="button-group">
          {!isActive && sec === 0 && (
            <button className="timer-control-btn start-btn single-btn" onClick={() => setIsActive(true)}>시작하기</button>
          )}
          {isActive && (
            <>
              <button className="timer-control-btn stop-btn" onClick={() => setIsActive(false)}>멈추기</button>
              <button className="timer-control-btn finish-btn" onClick={handleFinish}>끝내기</button>
            </>
          )}
          {!isActive && sec > 0 && (
            <>
              <button className="timer-control-btn resume-btn" onClick={() => setIsActive(true)}>계속하기</button>
              <button className="timer-control-btn finish-btn" onClick={handleFinish}>끝내기</button>
            </>
          )}
        </div>
      </main>
    </div>
  );
}