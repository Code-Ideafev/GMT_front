import React, { memo } from "react"; // 1. memo 추가
import "./StudyRecordCard.css";
import defaultProfile from "../MyPage/Group 92.svg"; 

// 2. profileImage를 props로 직접 받도록 수정
function StudyRecordCard({ 
  time = "0 : 00 : 00", 
  date = "2025.00.00", 
  isEditMode = false, 
  onUploadClick, 
  onResetClick,
  isMine = false, 
  userName = "이름 없음",
  profileImage // 👈 MyPage에서 전달받을 프로필 이미지
}) {
  
  // 3. 내부의 localStorage.getItem 제거 (성능 최적화 핵심)

  return (
    <>
      {!isEditMode ? (
        <div className="record-card">
          <div className="card-left-section">
            <div className="user-profile-circle">
              {isMine ? (
                // 부모로부터 받은 profileImage를 바로 사용
                <img src={profileImage || defaultProfile} alt="me" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
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

// 4. memo로 감싸서 export (데이터가 안 바뀌면 다시 안 그려지게 함)
export default memo(StudyRecordCard);