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
  
  const [userName, setUserName] = useState("불러오는 중..."); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [myTodayRecords, setMyTodayRecords] = useState([]); 
  const [sortedRanking, setSortedRanking] = useState([]);    

  const [myVisibleCount, setMyVisibleCount] = useState(5);
  const [rankVisibleCount, setRankVisibleCount] = useState(5);

  useEffect(() => {
    // 1. 페이지 설정
    document.title = "개인 페이지";

    const updateFavicon = () => {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    };
    updateFavicon();

    // 2. 로컬 스토리지 데이터 로드
    const localImage = localStorage.getItem("userProfileImage");
    if (localImage) setProfileImage(localImage);

    // 로그인 시 저장해둔 내 이메일을 가져옵니다. (필터링 기준)
    const myEmail = localStorage.getItem("userEmail"); 

    // 3. API 데이터 페칭
    const fetchData = async () => {
      try {
        // [A] 사용자 기본 정보 가져오기
        const userRes = await apiClient.get('/user/list'); 
        if (userRes.data) {
          const nameFromServer = userRes.data.name || userRes.data.userName || userRes.data.nickname;
          if (nameFromServer) setUserName(nameFromServer);
        }

        // [B] 전체 타이머 기록 가져오기
        // 백엔드 엔드포인트 주소를 확인하세요 (예: /timer/all 또는 /timer/list)
        const timerRes = await apiClient.get('/timer/list'); 
        const allRecords = timerRes.data; 

        if (allRecords && Array.isArray(allRecords)) {
          
          // 1) 내 기록만 필터링 (내 이메일과 일치하는 것만)
          const myFiltered = allRecords.filter(record => record.email === myEmail);
          setMyTodayRecords(myFiltered);

          // 2) 랭킹 데이터 처리
          // - 공개(isPublic) 설정된 유저만 필터링 (백엔드에서 안 해줄 경우를 대비)
          // - 공부 시간(time)이 높은 순으로 내림차순 정렬
          const ranking = allRecords
            .filter(record => record.isPublic === true) // 공개 유저만 포함
            .sort((a, b) => (b.time || 0) - (a.time || 0)); // 높은 시간순 정렬
          
          setSortedRanking(ranking);
        }
      } catch (error) {
        console.error("데이터 로드 실패:", error);
        setUserName("사용자"); 
      }
    };
    
    fetchData();
  }, [navigate]);

  const handleTogglePublic = async () => {
    // 프론트 상태 변경
    const newStatus = !isPublic;
    setIsPublic(newStatus);
    
    // (선택사항) 백엔드에 공개 여부 상태 저장 API 호출 로직이 필요할 수 있습니다.
    // await apiClient.patch('/user/status', { isPublic: newStatus });
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
          {/* 내 누적 공부시간 섹션 */}
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            <div className="record-list">
              {myTodayRecords.length > 0 ? (
                myTodayRecords.slice(0, myVisibleCount).map((item, index) => (
                  <StudyRecordCard key={index} {...item} profileImage={profileImage} />
                ))
              ) : (
                <p className="empty-msg">오늘 공부 한 기록이 없습니다.</p>
              )}
            </div>
          </div>
          
          {/* 랭킹 섹션 */}
          <div className="study-section">
            <h2 className="section-title">랭킹</h2>
            <div className="record-list">
              {sortedRanking.length > 0 ? (
                sortedRanking.slice(0, rankVisibleCount).map((item, index) => (
                  <div key={index} className={`rank-item-box rank-${index + 1}`}>
                     {index === 0 && <img src={crownIcon} alt="crown" className="crown-svg" />}
                     <StudyRecordCard {...item} profileImage={profileImage} />
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