import React, { memo } from "react"; 
import "./StudyRecordCard.css";
import defaultProfile from "../MyPage/Group 92.svg"; 

function StudyRecordCard({ 
  time = "0 : 00 : 00", 
  date = "2025.00.00", 
  isEditMode = false, 
  onUploadClick, 
  onResetClick,
  nickname = "이름 없음", // MyPage의 item.nickname과 맞춤
  profileImage          // MyPage에서 전달받은 이미지 (로컬스토리지 값)
}) {

  return (
    <>
      {!isEditMode ? (
        <div className="record-card">
          <div className="card-left-section">
            <div className="user-profile-circle">
              {/* 프로필 이미지가 있으면 보여주고, 없으면 기본 회색이나 기본 아이콘 표시 */}
              <img 
                src={profileImage || defaultProfile} 
                alt="profile" 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover',
                  borderRadius: '50%' 
                }} 
              />
            </div> 
            {/* 닉네임 표시 */}
            <span className="user-record-name">{nickname}</span>
          </div>
          
          {/* 누적 시간 */}
          <span className="record-time">{time}</span>
          
          {/* 날짜 */}
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

// 데이터 변경이 없을 때 불필요한 재렌더링을 방지하기 위해 memo 사용
export default memo(StudyRecordCard);