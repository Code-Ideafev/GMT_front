import React from "react";
import "./StudyRecordCard.css";

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
          {/* 가로 정렬을 위한 왼쪽 섹션 */}
          <div className="card-left-section" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div className="user-profile-circle" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center', flexShrink: 0 }}>
              {/* 내 기록이고 저장된 사진이 있으면 표시 */}
              {isMine && mySavedImage ? (
                <img src={mySavedImage} alt="me" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : null}
            </div> 
            <span className="user-record-name" style={{ whiteSpace: 'nowrap' }}>{userName}</span>
          </div>

          <div className="card-right-section" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span className="record-time">{time}</span>
            <span className="record-date">{date}</span>
          </div>
        </div>
      ) : (
        /* 편집 모드 내부 레이아웃 */
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