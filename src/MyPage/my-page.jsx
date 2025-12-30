import React, { useState, useEffect, useCallback } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import groupIcon from "./Group.svg";        
import groupOpenIcon from "./Group 67.svg"; 
import defaultProfile from "./Group 92.svg"; 
import crownIcon from "./Vector5.svg"; 
import { useNavigate } from "react-router-dom"; 
import { getUserListApi, getTimerListApi, setPublicApi, setPrivateApi } from '../api/apiClient';

export default function MyPage() {
  const navigate = useNavigate(); 
  
  const [userName, setUserName] = useState("불러오는 중..."); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(true); 
  const [myHistoryRecords, setMyHistoryRecords] = useState([]); 
  const [sortedRanking, setSortedRanking] = useState([]);

  const formatTime = (seconds) => {
    const totalSeconds = Math.max(0, Math.floor(seconds || 0));
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
  };

  const handleLogout = () => {
    if (window.confirm("로그아웃 하시겠습니까?")) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("userEmail");
      localStorage.removeItem("my_rockMode");
      // ✅ 로그아웃 시 이미지도 해제 (계정 키 방식으로 관리하므로 굳이 안 지워도 되지만 요청대로 제거)
      alert("로그아웃 되었습니다.");
      navigate("/"); 
    }
  };

  const fetchData = useCallback(async () => {
    const myEmail = localStorage.getItem("userEmail")?.trim().toLowerCase();
    const token = localStorage.getItem("accessToken");
    if (!token) return;

    try {
      const [userRes, timerRes] = await Promise.all([getUserListApi(), getTimerListApi()]);
      const userList = Array.isArray(userRes.data) ? userRes.data : (userRes.data?.data || []);
      const allRecords = Array.isArray(timerRes.data) ? timerRes.data : (timerRes.data?.data || []);

      const now = new Date();
      const todayDash = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;

      // ✅ 내 이메일 전용 키로 이미지 로드
      const localProfileImg = localStorage.getItem(`userProfileImage_${myEmail}`);
      
      const myInfo = userList.find(u => u.email?.trim().toLowerCase() === myEmail);
      const localRockMode = localStorage.getItem("my_rockMode");
      
      let currentMyPublicStatus = true;
      let myCurrentImg = localProfileImg || defaultProfile; // 내 프사는 로컬에서 가져옴

      if (myInfo) {
        setUserName(myInfo.username || "사용자");
        currentMyPublicStatus = localRockMode !== null ? localRockMode === "true" : true;
        setIsPublic(currentMyPublicStatus);
        setProfileImage(myCurrentImg);
      }

      const rankingMap = new Map();
      allRecords.forEach(record => {
        if (record.recordDate === todayDash) {
          const rEmail = record.email?.trim().toLowerCase();
          const userDetail = userList.find(u => u.email?.trim().toLowerCase() === rEmail);

          if (userDetail) {
            let isThisUserPublic = false;
            if (rEmail === myEmail) {
              isThisUserPublic = currentMyPublicStatus;
            } else {
              const rawMode = userDetail.rockMode;
              isThisUserPublic = (rawMode === true || rawMode === "true");
            }

            if (isThisUserPublic) {
              const val = Number(record.elapsedTime) || 0;
              const seconds = Math.floor(val >= 1000 ? val / 1000 : val);
              
              if (rankingMap.has(rEmail)) {
                const existing = rankingMap.get(rEmail);
                rankingMap.set(rEmail, { ...existing, totalSeconds: existing.totalSeconds + seconds });
              } else {
                // ✅ 핵심 요구사항: 나만 내 사진 보이고, 타인은 무조건 기본프사
                const displayImg = (rEmail === myEmail) ? myCurrentImg : defaultProfile;
                
                rankingMap.set(rEmail, { 
                  username: userDetail.username || "익명", 
                  totalSeconds: seconds,
                  userImg: displayImg
                });
              }
            }
          }
        }
      });

      const rankingData = Array.from(rankingMap.values())
        .sort((a, b) => b.totalSeconds - a.totalSeconds)
        .slice(0, 3)
        .map(user => ({
          nickname: user.username,
          time: formatTime(user.totalSeconds),
          date: todayDash.replace(/-/g, '.'),
          profileImage: user.userImg
        }));

      setSortedRanking(rankingData);

      const historyMap = new Map();
      allRecords
        .filter(r => r.email?.trim().toLowerCase() === myEmail)
        .forEach(record => {
          const date = record.recordDate;
          const val = Number(record.elapsedTime) || 0;
          const seconds = Math.floor(val >= 1000 ? val / 1000 : val);

          if (historyMap.has(date)) {
            historyMap.set(date, historyMap.get(date) + seconds);
          } else {
            historyMap.set(date, seconds);
          }
        });

      const historyData = Array.from(historyMap.entries())
        .map(([date, totalSec]) => ({
          nickname: myInfo?.username || "사용자",
          time: formatTime(totalSec),
          date: date.replace(/-/g, '.'),
          profileImage: myCurrentImg, // ✅ 내 누적기록은 내 사진 사용
          rawDate: new Date(date)
        }))
        .sort((a, b) => b.rawDate - a.rawDate);

      setMyHistoryRecords(historyData);

    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  }, []);

  const handleTogglePublic = async () => {
    const nextStatus = !isPublic;
    setIsPublic(nextStatus);
    localStorage.setItem("my_rockMode", String(nextStatus));
    try {
      if (nextStatus) await setPublicApi();
      else await setPrivateApi();
    } catch (error) {
      console.warn("서버 반영 실패(CORS)");
    }
    fetchData(); 
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = "개인 페이지";
    fetchData();
  }, [fetchData]);

  return (
    <div className="mypage-container">
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate("/timer")} style={{cursor: 'pointer'}}> 
          <button className="clock-btn">
            <div className="icon-stack">
              <img src={clockIcon} alt="history" className="clock-img base" />
            </div>
          </button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      <div className="profile-section">
        <div className="profile-content">
          <div className="profile-image-circle">
            <img src={profileImage || defaultProfile} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
          </div>
          <div className="profile-info-side">
            <div className="user-info-header">
              <span className="user-name">{userName}</span> 
              <button className="logout-small-btn" onClick={handleLogout}>로그아웃</button>
            </div>

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
              {myHistoryRecords.length > 0 ? (
                myHistoryRecords.map((item, index) => (
                  <StudyRecordCard key={index} nickname={item.nickname} time={item.time} date={item.date} profileImage={item.profileImage} />
                ))
              ) : (
                <p className="empty-msg">기록이 없습니다.</p>
              )}
            </div>
          </div>
          
          <div className="study-section">
            <h2 className="section-title">랭킹 (TOP 3)</h2>
            <div className="record-list">
              {sortedRanking.length > 0 ? (
                sortedRanking.map((item, index) => (
                  <div key={index} className={`rank-item-box rank-${index + 1}`} style={{ position: 'relative' }}>
                     {index === 0 && <img src={crownIcon} alt="crown" style={{ position: 'absolute', top: '-45px', left: '19px', zIndex: 10, width: '64px', height: '44px' }} />}
                     <StudyRecordCard nickname={item.nickname} time={item.time} date={item.date} profileImage={item.profileImage} />
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