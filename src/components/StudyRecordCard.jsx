import React from "react";
import "./StudyRecordCard.css";
import defaultProfile from "../MyPage/Group 92.svg"; 

export default function StudyRecordCard({ 
  time = "0 : 00 : 00", 
  date = "2025.00.00", 
  isEditMode = false, 
  onUploadClick, 
  onResetClick,
  isMine = false, 
  userName = "이름 없음" 
}) {
  const mySavedImage = localStorage.getItem("userProfileImage");

  return (
    <>
      {!isEditMode ? (
        /* 일반 기록 카드 */
        <div className="record-card">
          <div className="card-left-section">
            <div className="user-profile-circle">
              {isMine ? (
                <img src={mySavedImage || defaultProfile} alt="me" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#D9D9D9' }} />
              )}
            </div> 
            <span className="user-record-name">{userName}</span>
          </div>
          <span className="record-time">{time}</span>
          <span className="record-date">{date}</span>
        </div>
      ) : (
        /* 🟢 사진 편집 섹션: 이 내부 요소들이 중앙에 오도록 감싸는 구조 */
        <div className="edit-section-wrapper">
          <h2 className="edit-photo-title">사진 편집</h2>
          <div className="edit-button-group">
            <button className="white-shadow-btn" onClick={onUploadClick}>사진 업로드</button>
            <button className="white-shadow-btn" onClick={onResetClick}>기본 사진</button>
          </div>
        </div>
      )}
    </>
  );
}