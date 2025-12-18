import React from "react";
import "./StudyRecordCard.css";

export default function StudyRecordCard({ time, date, isEditMode = false }) {
  const name = "김수빈";

  return (
    <>
      {!isEditMode ? (
        /* 1. 마이페이지용 기본 학습 기록 카드 */
        <div className="record-card">
          <div className="card-left-section">
            <div className="user-profile-circle"></div> 
            <span className="user-record-name">{name}</span>
          </div>
          <div className="card-right-section">
            <span className="record-time">{time}</span>
            <span className="record-date">{date}</span>
          </div>
        </div>
      ) : (
        /* 2. 프로필 편집 페이지용 레이아웃 */
        <div className="edit-section-wrapper">
          <h2 className="edit-photo-title">사진 편집</h2>
          <div className="edit-button-group">
            <button className="white-shadow-btn">사진 업로드</button>
            <button className="white-shadow-btn">기본 사진</button>
          </div>
        </div>
      )}
    </>
  );
}