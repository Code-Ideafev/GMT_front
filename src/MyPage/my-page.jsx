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

  const formatTime = (seconds) => {
    const totalSeconds = parseInt(seconds || 0, 10);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${h} : ${String(m).padStart(2, '0')} : ${String(s).padStart(2, '0')}`;
  };

  useEffect(() => {
    document.title = "개인 페이지";
    const myEmail = localStorage.getItem("userEmail"); 
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("로그인이 필요합니다.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const userRes = await getUserListApi(); 
        let currentUsername = "사용자";

        if (Array.isArray(userRes.data)) {
          const myInfo = userRes.data.find(user => user.email === myEmail);
          currentUsername = myInfo?.username || myInfo?.nickname || "사용자";
        } else if (userRes.data?.username) {
          currentUsername = userRes.data.username;
        }
        
        setUserName(currentUsername);

        const timerRes = await getTimerListApi(); 
        if (timerRes.data && Array.isArray(timerRes.data)) {
          const allRecords = timerRes.data;

          const myBoxes = allRecords
            .filter(record => record.email === myEmail)
            .map(record => ({
              nickname: currentUsername, 
              time: formatTime(record.elapsedTime),
              date: record.date || "2025.09.04" 
            }));
          setMyTodayRecords(myBoxes);

          const rankingBoxes = allRecords
            .filter(record => record.rock === true)
            .sort((a, b) => (b.elapsedTime || 0) - (a.elapsedTime || 0))
            .map(record => ({
              nickname: record.nickname || record.username || "익명 유저",
              time: formatTime(record.elapsedTime),
              date: record.date || "2025.09.04"
            }));
          setSortedRanking(rankingBoxes);
        }
      } catch (error) {
        console.error("❌ 데이터 로드 중 에러 발생:", error);
        if (error.response?.status === 403) {
          setUserName("접근 권한 없음");
        } else {
          setUserName("서버 연결 실패");
        }
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
            <img src={profileImage || defaultProfile} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div className="profile-info-side">
            <span className="user-name">{userName}</span> 
            <button className="edit-profile-btn" onClick={() => navigate("/EditProfile")}>프로필 편집</button>
            <div className={`toggle-bar ${isPublic ? "is-public" : ""}`}>
              <div className="toggle-content-wrapper">
                {/* 뜬 눈/감긴 눈 모두 grey-icon을 적용해 회색으로 유지 */}
                <img src={isPublic ? groupOpenIcon : groupIcon} alt="eye" className="toggle-icon-img grey-icon" />
                <div className="toggle-text">
                  <p className="toggle-title">공부 시간 {isPublic ? "공개" : "비공개"}</p>
                  <p className="toggle-desc">
                    {isPublic ? "다른 사람들이 내 공부 시간을 볼 수 있습니다" : "공부 시간이 비공개로 설정되어 있습니다"}
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