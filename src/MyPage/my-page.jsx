import React, { useState, useEffect } from "react";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import groupIcon from "./Group.svg";       
import groupOpenIcon from "./Group 67.svg"; 
import defaultProfile from "./Group 92.svg"; 
import crownIcon from "./Vector5.svg"; 
import { useNavigate } from "react-router-dom"; 
import { getUserListApi, getTimerListApi } from '../api/apiClient';

export default function MyPage() {
  const navigate = useNavigate(); 
  
  const [userName, setUserName] = useState("불러오는 중..."); 
  const [profileImage, setProfileImage] = useState(null);
  const [isPublic, setIsPublic] = useState(false);
  const [myTodayRecords, setMyTodayRecords] = useState([]); 
  const [sortedRanking, setSortedRanking] = useState([]);    

  // 시간을 "H : MM : SS" 형식으로 변환
  const formatTime = (seconds) => {
    // 0초보다 작아지지 않게 방지
    const totalSeconds = Math.max(0, Math.floor(seconds || 0));
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    document.title = "개인 페이지";
    const myEmail = localStorage.getItem("userEmail"); 
    const token = localStorage.getItem("accessToken");

    const savedImage = localStorage.getItem("userProfileImage");
    if (savedImage) {
      setProfileImage(savedImage);
    }

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await getUserListApi(); 
        let currentUsername = "사용자";
        const userList = Array.isArray(userRes.data) ? userRes.data : userRes.data?.data;

        if (Array.isArray(userList)) {
          const myInfo = userList.find(user => 
            user.email?.trim().toLowerCase() === myEmail?.trim().toLowerCase()
          );
          if (myInfo) {
            currentUsername = myInfo.username || myInfo.nickname || "사용자";
          }
        }
        setUserName(currentUsername);

        const timerRes = await getTimerListApi(); 
        if (timerRes.data && Array.isArray(timerRes.data)) {
          const allRecords = timerRes.data;

          const today = new Date();
          const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

          const myLogsToday = allRecords.filter(record => 
            record.email === myEmail && record.recordDate === todayStr
          );

          if (myLogsToday.length > 0) {
            // ✅ 보정 포인트 1: 개별 기록을 더할 때 미리 소수점을 버립니다.
            const totalElapsedSeconds = myLogsToday.reduce((acc, cur) => {
                const serverValue = Number(cur.elapsedTime) || 0;
                const seconds = serverValue >= 1000 ? serverValue / 1000 : serverValue;
                return acc + Math.floor(seconds);
            }, 0);
            
            // ✅ 보정 포인트 2: 합산 결과가 0보다 크면 무조건 1초를 강제로 뺍니다.
            // 시스템상 어딘가에서 추가되는 1초를 여기서 상쇄합니다.
            const finalAdjustedSeconds = totalElapsedSeconds > 0 ? totalElapsedSeconds - 1 : 0;

            setMyTodayRecords([{
              nickname: currentUsername,
              time: formatTime(finalAdjustedSeconds),
              date: todayStr.replace(/-/g, '.')
            }]);
          } else {
            setMyTodayRecords([]);
          }

          // 랭킹에서도 1초씩 빼서 표시 (일관성)
          const rankingBoxes = allRecords
            .filter(record => record.rock === true)
            .sort((a, b) => (b.elapsedTime || 0) - (a.elapsedTime || 0))
            .map(record => {
              const rTime = Number(record.elapsedTime) || 0;
              const seconds = rTime >= 1000 ? rTime / 1000 : rTime;
              const finalRankSeconds = seconds > 0 ? Math.floor(seconds) - 1 : 0;
              return {
                nickname: record.nickname || record.username || "익명 유저",
                time: formatTime(finalRankSeconds),
                date: record.recordDate ? record.recordDate.replace(/-/g, '.') : "2025.09.04"
              };
            });
          setSortedRanking(rankingBoxes);
        }
      } catch (error) {
        console.error("❌ 데이터 로드 에러:", error);
        setUserName("사용자");
      }
    };
    
    fetchData();
  }, [navigate]);

  const handleTogglePublic = () => {
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
            <button className="edit-profile-btn" onClick={() => navigate("/EditProfile")}>프로필 편집</button>
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
                myTodayRecords.map((item, index) => (
                  <StudyRecordCard 
                    key={index}
                    nickname={item.nickname} 
                    time={item.time}           
                    date={item.date}
                    profileImage={profileImage || defaultProfile} 
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
                sortedRanking.map((item, index) => (
                  <div key={index} className={`rank-item-box rank-${index + 1}`}>
                     {index === 0 && (
                       <img 
                         src={crownIcon} 
                         alt="crown" 
                         className="crown-svg" 
                         style={{ 
                           position: 'absolute', 
                           top: '-55px', 
                           left: '5px', 
                           zIndex: 10, 
                           width: '90px', 
                           height: 'auto' 
                         }} 
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
                <p className="empty-msg">랭킹 데이터가 없습니다.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}