import React, { useState } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import cameraIcon from "./Camera.svg";
import groupIcon from "./Group.svg";       // 감긴 눈 아이콘
import groupOpenIcon from "./Group 67.svg"; // 뜬 눈 아이콘
import { useNavigate } from "react-router-dom"; 

export default function MyPage() {
  const userName = "김도연"; 
  const navigate = useNavigate(); 
  
  // 공개/비공개 스위치 상태 관리
  const [isPublic, setIsPublic] = useState(false);

  const handleToggle = () => {
    setIsPublic(!isPublic);
  };

  return (
    <div className="mypage-container">
      {/* 1. 상단 영역: 돌아가기 시계 버튼 */}
      <div className="header-area">
        <div className="icon-wrapper">
          <button className="clock-btn">
            <img src={clockIcon} alt="history" />
          </button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      {/* 2. 중앙 프로필 영역 */}
      <div className="profile-section">
        <div className="profile-content">
          <div className="profile-image-circle">
            <img src={cameraIcon} alt="camera" className="camera-icon-img" />
          </div>

          <div className="profile-info-side">
            <div className="user-name-container">
              <span className="user-name">{userName}</span>
            </div>
            {/* 평소 초록색 -> 호버 시 흰색 버튼 */}
            <button 
              className="edit-profile-btn" 
              onClick={() => navigate("/EditProfile")}
            >
              프로필 편집
            </button>
            
            {/* 공개 여부 토글바 (상태에 따라 배경색 바뀜) */}
            <div className={`toggle-bar ${isPublic ? "is-public" : ""}`}>
              <div className="toggle-content-wrapper">
                <img 
                  src={isPublic ? groupOpenIcon : groupIcon} 
                  alt="visibility icon" 
                  className={isPublic ? "toggle-icon-img eye-open-light" : "toggle-icon-img"} 
                />
                <div className="toggle-text">
                  <p className="toggle-title">
                    {isPublic ? "공부 시간 공개" : "공부 시간 비공개"}
                  </p>
                  <p className="toggle-subtitle">
                    {isPublic ? "다른 사람들이 내 공부 시간을 볼 수 있습니다" : "공부 시간이 비공개로 설정되어 있습니다"}
                  </p>
                </div>
              </div>
              <label className="toggle-switch-container">
                <input type="checkbox" checked={isPublic} onChange={handleToggle} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 하단 섹션 분할선 및 리스트 */}
      <div className="section-divider-container">
        <hr className="gray-line" />
        <div className="bottom-content-area">
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            <div className="record-list">
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
            </div>
          </div>

          <div className="study-section">
            <h2 className="section-title">전체 공부시간</h2>
            <div className="record-list">
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}