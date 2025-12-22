import React, { useState, useEffect } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import groupIcon from "./Group.svg";       
import groupOpenIcon from "./Group 67.svg"; 
import defaultProfile from "./Group 92.svg"; 
import crownIcon from "./Vector5.svg"; 
import { useNavigate } from "react-router-dom"; 
import apiClient from '../api/apiClient'; // 도연님이 만든 공통 클라이언트

export default function MyPage() {
  const navigate = useNavigate(); 
  
  // --- 상태 관리 (API 연동 시 여기에 데이터가 담깁니다) ---
  const [userName, setUserName] = useState("사용자"); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [myTodayRecords, setMyTodayRecords] = useState([]); // 내 공부 기록 배열
  const [sortedRanking, setSortedRanking] = useState([]);    // 랭킹 데이터 배열

  // --- 더보기/닫기 기능 위한 상태 ---
  const [myVisibleCount, setMyVisibleCount] = useState(5);
  const [rankVisibleCount, setRankVisibleCount] = useState(5);

  // --- 날짜 처리 (UI 표시 및 API 요청용) ---
  const getTodayDate = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}.${month}.${day}`;
  };
  const todayStr = getTodayDate();

  useEffect(() => {
    // 1. 로컬 이미지 불러오기
    setProfileImage(localStorage.getItem("userProfileImage"));

    // 2. API 데이터 로딩 (연동 시 주석 해제)
    const fetchData = async () => {
      try {
        /* const res = await apiClient.get('/api/v1/mypage'); 
        setUserName(res.data.userName);
        setMyTodayRecords(res.data.records);
        setSortedRanking(res.data.ranking);
        */
      } catch (error) {
        console.error("데이터 로드 실패:", error);
      }
    };
    fetchData();
  }, []);

  const handleTogglePublic = async () => {
    const newStatus = !isPublic;
    setIsPublic(newStatus);
    // TODO: apiClient.patch('/api/v1/user/status', { public: newStatus });
  };

  return (
    <div className="mypage-container">
      <div className="header-area">
        {/* 🟢 수정: 돌아가기 클릭 시 Timer 화면('/')으로 이동 */}
        <div className="icon-wrapper" onClick={() => navigate("/")}> 
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
            <span className="user-name">{userName}님</span>
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
                <input type="checkbox" checked={isPublic} onChange={handleTogglePublic} />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="section-divider-container">
        <hr className="gray-line" />
        <div className="bottom-content-area">
          {/* 내 공부 시간 섹션 */}
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            <div className="record-list">
              {myTodayRecords.length > 0 ? (
                myTodayRecords.slice(0, myVisibleCount).map((item, index) => (
                  <StudyRecordCard key={index} {...item} />
                ))
              ) : (
                <p className="empty-msg">오늘 공부 한 기록이 없습니다.</p>
              )}
            </div>
            {myTodayRecords.length > 5 && (
              <div className="button-group-row">
                {myVisibleCount < myTodayRecords.length && <button className="styled-action-btn" onClick={() => setMyVisibleCount(prev => prev + 5)}>더보기 ∨</button>}
                {myVisibleCount > 5 && <button className="styled-action-btn" onClick={() => setMyVisibleCount(5)}>닫기 ∧</button>}
              </div>
            )}
          </div>
          
          {/* 랭킹 섹션 */}
          <div className="study-section">
            <h2 className="section-title">랭킹</h2>
            <div className="record-list">
              {sortedRanking.length > 0 ? (
                sortedRanking.slice(0, rankVisibleCount).map((item, index) => (
                  <div key={index} className={`rank-item-box rank-${index + 1}`}>
                     {index === 0 && <img src={crownIcon} alt="crown" className="crown-svg" />}
                     <StudyRecordCard {...item} />
                  </div>
                ))
              ) : (
                <p className="empty-msg">랭킹 데이터가 없습니다.</p>
              )}
            </div>
            {sortedRanking.length > 5 && (
              <div className="button-group-row">
                {rankVisibleCount < sortedRanking.length && <button className="styled-action-btn" onClick={() => setRankVisibleCount(prev => prev + 5)}>더보기 ∨</button>}
                {rankVisibleCount > 5 && <button className="styled-action-btn" onClick={() => setRankVisibleCount(5)}>닫기 ∧</button>}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}