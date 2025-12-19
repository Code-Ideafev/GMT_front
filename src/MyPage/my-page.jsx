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

  return (
    <div className="mypage-container">
      <div className="header-area">
        <div className="icon-wrapper">
          {/* 시계 아이콘 영역 수정 */}
          <button className="clock-btn">
            <div className="icon-stack">
              <img src={clockIcon} alt="history" className="clock-img base" />
              <img src={clockIcon} alt="history" className="clock-img hover" />
            </div>
          </button>
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
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            <div className="record-list">
              <StudyRecordCard isMine={true} userName={userName} time="3 : 40 : 03" date="2025.09.04" />
              <StudyRecordCard isMine={true} userName={userName} time="3 : 40 : 03" date="2025.09.04" />
              <StudyRecordCard isMine={true} userName={userName} time="3 : 40 : 03" date="2025.09.04" />
            </div>
          </div>

          <div className="study-section">
            <h2 className="section-title">전체 공부시간 (랭킹)</h2>
            <div className="record-list">
              <StudyRecordCard isMine={false} userName="이준호" time="10 : 00 : 00" date="2025.09.04" />
              {isPublic && (
                <StudyRecordCard isMine={true} userName={userName} time="3 : 40 : 03" date="2025.09.04" />
              )}
              <StudyRecordCard isMine={false} userName="박지민" time="2 : 50 : 00" date="2025.09.04" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}