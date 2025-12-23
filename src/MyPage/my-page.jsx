import React, { useState, useEffect } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import groupIcon from "./Group.svg";       
import groupOpenIcon from "./Group 67.svg"; 
import defaultProfile from "./Group 92.svg"; 
import crownIcon from "./Vector5.svg"; 
import { useNavigate } from "react-router-dom"; 
import apiClient from '../api/apiClient';

export default function MyPage() {
  const navigate = useNavigate(); 
  
  // --- 상태 관리 ---
  const [userName, setUserName] = useState("불러오는 중..."); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [myTodayRecords, setMyTodayRecords] = useState([]); 
  const [sortedRanking, setSortedRanking] = useState([]);    

  const [myVisibleCount, setMyVisibleCount] = useState(5);
  const [rankVisibleCount, setRankVisibleCount] = useState(5);

  useEffect(() => {
    // 1. 프로필 이미지는 로컬 스토리지에서 즉시 로드 (사용자 경험 향상)
    const localImage = localStorage.getItem("userProfileImage");
    if (localImage) setProfileImage(localImage);

    // 2. 실제 서버 데이터 호출
    const fetchData = async () => {
      try {
        // [REAL API CALL] 명세서의 회원 조회 API 호출
        const res = await apiClient.get('/user/list'); 
        
        console.log("서버 데이터 수신 성공:", res.data);

        if (res.data) {
          // 백엔드에서 주는 필드명이 name, userName, nickname 중 무엇이든 대응
          const nameFromServer = res.data.name || res.data.userName || res.data.nickname;
          if (nameFromServer) {
            setUserName(nameFromServer);
          }
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        
        // 토큰이 없거나 만료(401)된 경우 로그인 페이지로 강제 이동 (필요 시 주석 해제)
        // if (error.response && error.response.status === 401) {
        //   alert("로그인이 필요합니다.");
        //   navigate("/login");
        // }
        
        setUserName("사용자"); 
      }
    };

    fetchData();
  }, [navigate]);

  // 공개 여부 토글 (나중에 서버에 저장하는 PUT API가 생긴다면 여기서 호출)
  const handleTogglePublic = async () => {
    setIsPublic(!isPublic);
  };

  return (
    <div className="mypage-container">
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate("/timer")}> 
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
            <img 
              src={profileImage || defaultProfile} 
              alt="profile" 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
            />
          </div>
          <div className="profile-info-side">
            <span className="user-name">{userName}</span>
            <button className="edit-profile-btn" onClick={() => navigate("/EditProfile")}>
              프로필 편집
            </button>
            <div className={`toggle-bar ${isPublic ? "is-public" : ""}`}>
              <div className="toggle-content-wrapper">
                <img src={isPublic ? groupOpenIcon : groupIcon} alt="eye" className="toggle-icon-img grey-icon" />
                <div className="toggle-text">
                  <p className="toggle-title">공부 시간 {isPublic ? "공개" : "비공개"}</p>
                  <p className="toggle-desc">
                    {isPublic ? "다른 사람들이 내 공부 시간을 볼 수 있습니다" : "다른 사람들이 내 공부 시간을 볼 수 없습니다"}
                  </p>
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
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            <div className="record-list">
              {myTodayRecords.length > 0 ? (
                myTodayRecords.slice(0, myVisibleCount).map((item, index) => (
                  <StudyRecordCard 
                    key={index} 
                    {...item} 
                    profileImage={profileImage} 
                  />
                ))
              ) : (
                <p className="empty-msg">오늘 공부 한 기록이 없습니다.</p>
              )}
            </div>
          </div>
          
          <div className="study-section">
            <h2 className="section-title">랭킹</h2>
            <div className="record-list">
              {sortedRanking.length > 0 ? (
                sortedRanking.slice(0, rankVisibleCount).map((item, index) => (
                  <div key={index} className={`rank-item-box rank-${index + 1}`}>
                     {index === 0 && <img src={crownIcon} alt="crown" className="crown-svg" />}
                     <StudyRecordCard 
                        {...item} 
                        profileImage={profileImage} 
                      />
                  </div>
                ))
              ) : (
                <p className="empty-msg">랭킹 데이터가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}