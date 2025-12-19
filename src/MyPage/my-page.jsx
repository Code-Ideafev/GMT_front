import React, { useState, useEffect } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import cameraIcon from "./Camera.svg";
import groupIcon from "./Group.svg";       
import groupOpenIcon from "./Group 67.svg"; 
import { useNavigate } from "react-router-dom"; 

export default function MyPage() {
  const userName = "김도연"; 
  const navigate = useNavigate(); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(false);

  useEffect(() => {
    // 저장된 프로필 사진 불러오기
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) setProfileImage(savedImage);
  }, []);

  // 랭킹 데이터 (공부 시간 순 정렬됨)
  const rankingData = [
    { name: "이준호", time: "10 : 00 : 00", date: "2025.09.04", isMine: false },
    { name: "박지민", time: "08 : 50 : 03", date: "2025.09.04", isMine: false },
    { name: "김도연", time: "03 : 40 : 03", date: "2025.09.04", isMine: true }, // 본인
    { name: "최수아", time: "01 : 20 : 11", date: "2025.09.04", isMine: false },
  ];

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
            {profileImage ? (
              <img src={profileImage} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            ) : (
              <img src={cameraIcon} alt="camera" className="camera-icon-img" />
            )}
          </div>

          <div className="profile-info-side">
            <span className="user-name">{userName}</span>
            <button className="edit-profile-btn" onClick={() => navigate("/EditProfile")}>프로필 편집</button>
            
            <div className={`toggle-bar ${isPublic ? "is-public" : ""}`}>
              <div className="toggle-content-wrapper">
                <img src={isPublic ? groupOpenIcon : groupIcon} alt="eye" className="toggle-icon-img" />
                <div className="toggle-text">
                  <p className="toggle-title">{isPublic ? "공부 시간 공개" : "공부 시간 비공개"}</p>
                  <p className="toggle-subtitle">{isPublic ? "다른 사람들이 내 공부 시간을 볼 수 있습니다" : "공부 시간이 비공개로 설정되어 있습니다"}</p>
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
            </div>
          </div>

          <div className="study-section">
            <h2 className="section-title">전체 공부시간 (랭킹)</h2>
            <div className="record-list">
              {rankingData.map((user, index) => {
                // 비공개(isPublic: false)일 때 내 카드(isMine: true)는 랭킹에 띄우지 않음
                if (!isPublic && user.isMine) return null;
                return (
                  <StudyRecordCard 
                    key={index} 
                    isMine={user.isMine} 
                    userName={user.name} 
                    time={user.time} 
                    date={user.date} 
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}