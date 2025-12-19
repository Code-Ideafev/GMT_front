import React, { useState, useEffect } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
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
        <div className="icon-wrapper" onClick={() => navigate(-1)}>
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
          <div className="profile-image-circle">
            <img src={profileImage || defaultProfile} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>

          <div className="profile-info-side">
            <span className="user-name">{userName}</span>
            <button className="edit-profile-btn" onClick={() => navigate("/EditProfile")}>프로필 편집</button>
            <div className={`toggle-bar ${isPublic ? "is-public" : ""}`}>
              <div className="toggle-content-wrapper">
                <img src={isPublic ? groupOpenIcon : groupIcon} alt="eye" className="toggle-icon-img grey-icon" />
                <div className="toggle-text">
                  <p className="toggle-title">공부 시간 {isPublic ? "공개" : "비공개"}</p>
                  <p className="toggle-desc">
                    {isPublic ? "다른 사람들이 내 공부 시간을 볼 수 있습니다" : "공부 시간이 비공개로 설정되어 있습니다"}
                  </p>
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
              <StudyRecordCard userName={userName} time="3 : 40 : 03" date="2025.09.04" isMine={true} />
              <StudyRecordCard userName={userName} time="2 : 15 : 10" date="2025.09.03" isMine={true} />
            </div>
          </div>
          
          <div className="study-section">
            <h2 className="section-title">랭킹</h2>
            <div className="record-list">
              {isPublic && (
                <StudyRecordCard userName={userName} time="3 : 40 : 03" date="2025.09.04" isMine={true} />
              )}
              <StudyRecordCard userName="이준호" time="10 : 00 : 00" date="2025.09.04" />
              <StudyRecordCard userName="박지민" time="08 : 30 : 00" date="2025.09.04" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}