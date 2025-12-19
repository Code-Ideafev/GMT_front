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

  // 🟢 각 섹션별 노출 개수 상태
  const [myVisibleCount, setMyVisibleCount] = useState(5);
  const [rankVisibleCount, setRankVisibleCount] = useState(5);

  // 테스트 데이터 (각 20개씩)
  const myRecords = Array(20).fill({ userName, time: "3 : 40 : 03", date: "2025.09.04", isMine: true });
  const rankRecords = Array(20).fill({ userName: "이준호", time: "10 : 00 : 00", date: "2025.09.04" });

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
          
          {/* 왼쪽 섹션 */}
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            <div className="record-list">
              {myRecords.slice(0, myVisibleCount).map((item, index) => (
                <StudyRecordCard key={index} {...item} />
              ))}
            </div>
            
            <div className="button-group">
              {/* 더 보여줄 데이터가 있을 때만 더보기 표시 */}
              {myVisibleCount < myRecords.length && (
                <button className="action-btn" onClick={() => setMyVisibleCount(prev => prev + 5)}>더보기 ∨</button>
              )}
              {/* 초기값 5개보다 많이 펼쳐져 있을 때만 닫기 표시 */}
              {myVisibleCount > 5 && (
                <button className="action-btn" onClick={() => setMyVisibleCount(5)}>닫기 ∧</button>
              )}
            </div>
          </div>
          
          {/* 오른쪽 섹션 */}
          <div className="study-section">
            <h2 className="section-title">랭킹</h2>
            <div className="record-list">
              {rankRecords.slice(0, rankVisibleCount).map((item, index) => (
                <StudyRecordCard key={index} {...item} />
              ))}
            </div>
            
            <div className="button-group">
              {rankVisibleCount < rankRecords.length && (
                <button className="action-btn" onClick={() => setRankVisibleCount(prev => prev + 5)}>더보기 ∨</button>
              )}
              {rankVisibleCount > 5 && (
                <button className="action-btn" onClick={() => setRankVisibleCount(5)}>닫기 ∧</button>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}