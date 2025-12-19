import React, { useState, useEffect } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import groupIcon from "./Group.svg";       
import groupOpenIcon from "./Group 67.svg"; 
import defaultProfile from "./Group 92.svg"; 
import crownIcon from "./Vector5.svg"; 
import { useNavigate } from "react-router-dom"; 

export default function MyPage() {
  const userName = "김도연"; 
  const navigate = useNavigate(); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(false);

  const [myVisibleCount, setMyVisibleCount] = useState(5);
  const [rankVisibleCount, setRankVisibleCount] = useState(5);

  const myTodayRecords = Array.from({ length: 20 }, (_, i) => ({
    userName,
    time: `00 : ${String(59 - i).padStart(2, '0')} : 00`, 
    date: "2025.09.04",
    isMine: true
  }));

  const otherRankers = Array.from({ length: 20 }, (_, i) => ({
    userName: `유저 ${i + 1}`,
    time: `${String(Math.max(0, 10 - i)).padStart(2, '0')} : 00 : 00`, 
    date: "2025.09.04"
  }));

  const getSortedRanking = () => {
    let list = [...otherRankers];
    if (isPublic) {
      const myBestRecord = [...myTodayRecords].sort((a, b) => b.time.localeCompare(a.time))[0];
      list.push(myBestRecord);
    }
    return list.sort((a, b) => b.time.localeCompare(a.time));
  };

  const sortedRanking = getSortedRanking();

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
                  <p className="toggle-desc">{isPublic ? "다른 사람들이 내 공부 시간을 볼 수 있습니다" : "공부 시간이 비공개로 설정되어 있습니다"}</p>
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
              {myTodayRecords.slice(0, myVisibleCount).map((item, index) => (
                <StudyRecordCard key={index} {...item} />
              ))}
            </div>
            <div className="button-group-row">
              {myVisibleCount < myTodayRecords.length && <button className="styled-action-btn" onClick={() => setMyVisibleCount(prev => prev + 5)}>더보기 ∨</button>}
              {myVisibleCount > 5 && <button className="styled-action-btn" onClick={() => setMyVisibleCount(5)}>닫기 ∧</button>}
            </div>
          </div>
          
          <div className="study-section">
            <h2 className="section-title">랭킹</h2>
            <div className="record-list">
              {sortedRanking.slice(0, rankVisibleCount).map((item, index) => (
                <div key={index} className={`rank-item-box rank-${index + 1}`}>
                   {index === 0 && <img src={crownIcon} alt="crown" className="crown-svg" />}
                   <StudyRecordCard {...item} />
                </div>
              ))}
            </div>
            <div className="button-group-row">
              {rankVisibleCount < sortedRanking.length && <button className="styled-action-btn" onClick={() => setRankVisibleCount(prev => prev + 5)}>더보기 ∨</button>}
              {rankVisibleCount > 5 && <button className="styled-action-btn" onClick={() => setRankVisibleCount(5)}>닫기 ∧</button>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}