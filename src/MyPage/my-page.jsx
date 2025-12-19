import React, { useState, useEffect } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import cameraIcon from "./Camera.svg";
import groupIcon from "./Group.svg";       
import groupOpenIcon from "./Group 67.svg"; 
import defaultProfile from "./Group 92.svg"; 
import { useNavigate } from "react-router-dom"; 

export default function MyPage() {
  const userName = "김도연"; 
  const navigate = useNavigate(); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("userProfileImage");
    setProfileImage(saved);
  }, []);

  // 1. 내 누적 공부 기록 (갯수에 따라 박스 생성)
  const myRecords = [
    { time: "3 : 40 : 03", date: "2025.09.04" },
    { time: "2 : 20 : 10", date: "2025.09.04" },
    { time: "1 : 15 : 45", date: "2025.09.03" },
    { time: "4 : 10 : 00", date: "2025.09.02" },
    { time: "0 : 50 : 22", date: "2025.09.01" },
  ];

  // 2. 전체 랭킹 데이터 (상위 20명)
  const ranking20 = Array.from({ length: 20 }, (_, i) => ({
    name: `사용자 ${i + 1}`,
    time: `${20 - i} : 00 : 00`,
    date: "2025.09.04",
    isMine: false
  }));

  return (
    <div className="mypage-container">
      <div className="header-area">
        <div className="icon-wrapper">
          <button className="clock-btn"><img src={clockIcon} alt="history" /></button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-content">
          <div className="profile-image-circle" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <img src={profileImage || defaultProfile} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div className="profile-info-side">
            <span className="user-name">{userName}</span>
            <button className="edit-profile-btn" onClick={() => navigate("/EditProfile")}>프로필 편집</button>
            <div className={`toggle-bar ${isPublic ? "is-public" : ""}`}>
              <div className="toggle-content-wrapper">
                <img src={isPublic ? groupOpenIcon : groupIcon} alt="eye" className="toggle-icon-img" />
                <div className="toggle-text">
                  <p className="toggle-title">{isPublic ? "공부 시간 공개" : "공부 시간 비공개"}</p>
                </div>
              </div>
              <label className="toggle-switch-container">
                <input type="checkbox" checked={isPublic} onChange={() => setIsPublic(!isPublic)} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider-container">
        <hr className="gray-line" />
        <div className="bottom-content-area">
          {/* 왼쪽 섹션 */}
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            <div className="record-list-wrapper">
              <div className="record-list scroll-area">
                {myRecords.map((record, index) => (
                  <StudyRecordCard key={index} isMine={true} userName={userName} time={record.time} date={record.date} />
                ))}
              </div>
            </div>
          </div>

          {/* 오른쪽 섹션 */}
          <div className="study-section">
            <h2 className="section-title">전체 공부시간 (랭킹 20)</h2>
            <div className="record-list-wrapper">
              <div className="record-list scroll-area">
                {isPublic && <StudyRecordCard isMine={true} userName={userName} time="3 : 40 : 03" date="2025.09.04" />}
                {ranking20.map((user, index) => (
                  <StudyRecordCard key={index} isMine={user.isMine} userName={user.name} time={user.time} date={user.date} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
//헤헤