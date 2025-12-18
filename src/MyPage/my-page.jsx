import React from "react";
import "./my-page.css";
// 상위 폴더인 components에서 가져오도록 경로 설정
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import cameraIcon from "./Camera.svg";
import groupIcon from "./Group.svg";

export default function MyPage() {
  const userName = "이름명"; 

  return (
    <div className="mypage-container">
      {/* 1. 상단 영역 (시계 아이콘 및 돌아가기) */}
      <div className="header-area">
        <div className="icon-wrapper">
          <button className="icon-button">
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
            <button className="edit-profile-btn">프로필 편집</button>
            
            <div className="toggle-bar">
              <div className="toggle-content-wrapper">
                <img src={groupIcon} alt="visibility icon" className="toggle-icon-img" />
                <div className="toggle-text">
                  <p className="toggle-title">공부 시간 공개</p>
                  <p className="toggle-subtitle">공부 시간이 비공개로 설정되어 있습니다</p>
                </div>
              </div>
              <label className="toggle-switch-container">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 하단 대칭 섹션 */}
      <div className="section-divider-container">
        <hr className="gray-line" />
        <div className="bottom-content-area">
          
          {/* 왼쪽 영역: 내 누적 공부시간 */}
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            <div className="record-list">
              {/* 컴포넌트 적용 부분 */}
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
              <StudyRecordCard time="3 : 40 : 03" date="2025.09.04" />
            </div>
          </div>

          {/* 오른쪽 영역: 전체 공부시간 */}
          <div className="study-section">
            <h2 className="section-title">전체 공부시간</h2>
            <div className="record-list">
              {/* 컴포넌트 적용 부분 */}
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