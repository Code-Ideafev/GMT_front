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
        <div className="record-card">
          <div className="card-left-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="user-profile-circle" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0, backgroundColor: '#D9D9D9' }}>
              {isMine ? (
                <img src={mySavedImage || defaultProfile} alt="me" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ width: '100%', height: '100%', backgroundColor: '#D9D9D9' }} />
              )}
            </div> 
            <span className="user-record-name" style={{ whiteSpace: 'nowrap' }}>{userName}</span>
          </div>

          <div className="card-right-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span className="record-time">{time}</span>
            <span className="record-date">{date}</span>
          </div>
        </div>
      ) : (
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