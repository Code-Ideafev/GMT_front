import React, { useState, useEffect, useCallback } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import groupIcon from "./Group.svg";       
import groupOpenIcon from "./Group 67.svg"; 
import defaultProfile from "./Group 92.svg"; 
import crownIcon from "./Vector5.svg"; 
import { useNavigate } from "react-router-dom"; 
import { getUserListApi, getTimerListApi, updateUserSettingsApi } from '../api/apiClient';

export default function MyPage() {
  const navigate = useNavigate(); 
  
  const [userName, setUserName] = useState("불러오는 중..."); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(false); 
  const [myTodayRecords, setMyTodayRecords] = useState([]); 
  const [sortedRanking, setSortedRanking] = useState([]);

  const formatTime = (seconds) => {
    const totalSeconds = Math.max(0, Math.floor(seconds || 0));
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
  };

  // ✅ 데이터 가공 및 랭킹 집계 함수
  const fetchData = useCallback(async () => {
    const myEmail = localStorage.getItem("userEmail")?.trim().toLowerCase();
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const [userRes, timerRes] = await Promise.all([getUserListApi(), getTimerListApi()]);
      
      // 데이터 구조 유연하게 대응 (userRes.data 또는 userRes.data.data)
      const userList = Array.isArray(userRes.data) ? userRes.data : (userRes.data?.data || []);
      const allRecords = Array.isArray(timerRes.data) ? timerRes.data : (timerRes.data?.data || []);

      const now = new Date();
      const todayDash = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
      const todayDot = todayDash.replace(/-/g, '.');

      // 1. 내 정보 설정 (LocalStorage 우선순위 적용)
      const myInfo = userList.find(u => u.email?.trim().toLowerCase() === myEmail);
      const localRockMode = localStorage.getItem("my_rockMode");
      
      let currentMyPublicStatus = false;
      if (myInfo) {
        setUserName(myInfo.username || "사용자");
        currentMyPublicStatus = localRockMode !== null ? localRockMode === "true" : myInfo.rockMode === true;
        setIsPublic(currentMyPublicStatus);
      }

      // 2. 랭킹 집계 (Map 활용 및 데이터 정규화)
      const rankingMap = new Map();

      allRecords.forEach(record => {
        // 오늘 날짜 기록만 처리
        if (record.recordDate === todayDash) {
          const rEmail = record.email?.trim().toLowerCase();
          // 유저 리스트에서 해당 이메일 소유자 찾기
          const userDetail = userList.find(u => u.email?.trim().toLowerCase() === rEmail);

          if (userDetail) {
            // ✅ 다른 사용자 정보 누락 방지를 위해 rockMode를 불리언으로 강제 변환
            const isThisUserPublic = (rEmail === myEmail) 
              ? currentMyPublicStatus 
              : (userDetail.rockMode === true || userDetail.rockMode === "true");

            if (isThisUserPublic) {
              const val = Number(record.elapsedTime) || 0;
              const seconds = Math.floor(val >= 1000 ? val / 1000 : val);
              
              if (rankingMap.has(rEmail)) {
                const existing = rankingMap.get(rEmail);
                rankingMap.set(rEmail, { 
                  ...existing, 
                  totalSeconds: existing.totalSeconds + seconds 
                });
              } else {
                rankingMap.set(rEmail, { 
                  username: userDetail.username || "익명", 
                  totalSeconds: seconds 
                });
              }
            }
          }
        }
      });

      // 랭킹 상위 3명 정렬
      const rankingData = Array.from(rankingMap.values())
        .sort((a, b) => b.totalSeconds - a.totalSeconds)
        .slice(0, 3)
        .map(user => ({
          nickname: user.username,
          time: formatTime(user.totalSeconds),
          date: todayDot
        }));

      setSortedRanking(rankingData);

      // 3. 내 오늘 누적 시간
      const myTotalSec = allRecords
        .filter(r => r.email?.trim().toLowerCase() === myEmail && r.recordDate === todayDash)
        .reduce((acc, cur) => {
          const v = Number(cur.elapsedTime) || 0;
          return acc + Math.floor(v >= 1000 ? v / 1000 : v);
        }, 0);

      setMyTodayRecords(myTotalSec > 0 ? [{
        nickname: userName || "사용자",
        time: formatTime(myTotalSec),
        date: todayDot
      }] : []);

    } catch (error) {
      console.error("데이터 로드 중 에러 발생:", error);
    }
  }, [userName]);

  // ✅ 공개 설정 토글 (LocalStorage + Server)
  const handleTogglePublic = async () => {
    const nextStatus = !isPublic;
    
    setIsPublic(nextStatus);
    localStorage.setItem("my_rockMode", String(nextStatus));

    try {
      if (typeof updateUserSettingsApi === 'function') {
        await updateUserSettingsApi({ rockMode: nextStatus });
      }
    } catch (error) {
      console.warn("⚠️ 서버 저장 실패(CORS), 로컬에만 저장되었습니다.");
    }
    
    // 랭킹 즉시 재계산
    fetchData(); 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "개인 페이지";
    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) setProfileImage(savedImage);
    
    fetchData();
  }, [fetchData]);

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
                  <p className="toggle-desc">{isPublic ? "다른 사람들이 내 공부 시간을 볼 수 있습니다" : "다른 사람들이 내 공부 시간을 볼 수 없습니다"}</p>
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
                myTodayRecords.map((item, index) => (
                  <StudyRecordCard key={index} nickname={item.nickname} time={item.time} date={item.date} profileImage={profileImage || defaultProfile} />
                ))
              ) : (
                <p className="empty-msg">오늘 공부 한 기록이 없습니다.</p>
              )}
            </div>
          </div>
          
          <div className="study-section">
            <h2 className="section-title">랭킹 (TOP 3)</h2>
            <div className="record-list">
              {sortedRanking.length > 0 ? (
                sortedRanking.map((item, index) => (
                  <div key={index} className={`rank-item-box rank-${index + 1}`} style={{ position: 'relative' }}>
                     {index === 0 && (
                       <img 
                         src={crownIcon} 
                         alt="crown" 
                         style={{ position: 'absolute', top: '-45px', left: '19px', zIndex: 10, width: '64px', height: '44px' }} 
                       />
                     )}
                     <StudyRecordCard 
                        nickname={item.nickname} 
                        time={item.time} 
                        date={item.date} 
                        profileImage={defaultProfile} 
                     />
                  </div>
                ))
              ) : (
                <p className="empty-msg">기록이 없거나 공부 시간을 공개한 유저가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}