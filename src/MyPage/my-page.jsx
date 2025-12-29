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
  const [profileImage, setProfileImage] = useState(null); // 내 프로필 이미지 상태
  const [isPublic, setIsPublic] = useState(true); 
  const [myTodayRecords, setMyTodayRecords] = useState([]); 
  const [sortedRanking, setSortedRanking] = useState([]);

  const formatTime = (seconds) => {
    const totalSeconds = Math.max(0, Math.floor(seconds || 0));
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
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
      const todayDot = todayDash.replace(/-/g, '.');

      // 1. 내 정보 설정
      const myInfo = userList.find(u => u.email?.trim().toLowerCase() === myEmail);
      const localRockMode = localStorage.getItem("my_rockMode");
      const localProfileImg = localStorage.getItem("userProfileImage"); // 프로필 수정에서 저장한 로컬 값
      
      let currentMyPublicStatus = true;
      let myCurrentImg = defaultProfile; // 내 이미지 변수 선언

      if (myInfo) {
        setUserName(myInfo.username || "사용자");
        currentMyPublicStatus = localRockMode !== null ? localRockMode === "true" : true;
        setIsPublic(currentMyPublicStatus);
        
        // 내 이미지는 서버값 우선 -> 없으면 로컬스토리지 백업 -> 없으면 기본 이미지
        myCurrentImg = myInfo.profileImage || localProfileImg || defaultProfile;
        setProfileImage(myCurrentImg);
      }

      const rankingMap = new Map();

      // 2. 랭킹 집계 및 사용자별 이미지 매칭
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
              if (rawMode === false || rawMode === "false") {
                isThisUserPublic = false;
              }
            }
              if (isThisUserPublic) {
              const val = Number(record.elapsedTime) || 0;
              const seconds = Math.floor(val >= 1000 ? val / 1000 : val);
              
              if (rankingMap.has(rEmail)) {
                const existing = rankingMap.get(rEmail);
                rankingMap.set(rEmail, { ...existing, totalSeconds: existing.totalSeconds + seconds });
              } else {
                rankingMap.set(rEmail, { 
                  username: userDetail.username || "익명", 
                  totalSeconds: seconds,
                  // ⭐ 포인트: 내가 랭킹에 있다면 내 이미지를, 타인이면 타인의 이미지를 매칭
                  
                  userImg: userDetail.email === myEmail ? myCurrentImg : (userDetail.profileImageUrl)
                });
              }
            }
          }
        }
      });

      // 3. 랭킹 데이터 정렬 및 상태 반영
      const rankingData = Array.from(rankingMap.values())
        .sort((a, b) => b.totalSeconds - a.totalSeconds)
        .slice(0, 3)
        .map(user => ({
          nickname: user.username,
          time: formatTime(user.totalSeconds),
          date: todayDot,
          profileImage: user.userImg // 여기서 매칭된 각자의 이미지가 카드에 전달됨
        }));

      setSortedRanking(rankingData);

      // 4. 내 오늘 기록 카드 설정
      const myTotalSec = allRecords
        .filter(r => r.email?.trim().toLowerCase() === myEmail && r.recordDate === todayDash)
        .reduce((acc, cur) => {
          const v = Number(cur.elapsedTime) || 0;
          return acc + Math.floor(v >= 1000 ? v / 1000 : v);
        }, 0);

      setMyTodayRecords(myTotalSec > 0 ? [{
        nickname: myInfo?.username || "사용자",
        time: formatTime(myTotalSec),
        date: todayDot,
        profileImage: myCurrentImg // 내 이미지 적용
      }] : []);

    } catch (error) {
      console.error("데이터 로드 실패:", error);
    }
  }, []); // userName 의존성을 제거하여 무한 루프 방지

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
            {/* 상단 프로필 영역 내 이미지 */}
            <img src={profileImage || defaultProfile} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
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
                  <StudyRecordCard 
                    key={index} 
                    nickname={item.nickname} 
                    time={item.time} 
                    date={item.date} 
                    profileImage={item.profileImage} // 내 이미지가 Card로 전달됨
                  />
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
                        profileImage={item.profileImage} // 각 사용자별(나 포함) 이미지가 Card로 전달됨
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