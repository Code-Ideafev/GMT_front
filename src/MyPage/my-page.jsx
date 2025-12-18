import "./my-page.css";
import clockIcon from "./Vector.svg";
import cameraIcon from "./Camera.svg";
import groupIcon from "./Group.svg";

export default function MyPage() {
  const userName = "이름명"; 

  return (
    <div className="mypage-container">
      {/* 1. 상단 영역 */}
      <div className="header-area">
        <div className="icon-wrapper">
          <button className="icon-button">
            <img src={clockIcon} alt="history" />
          </button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      {/* 2. 중앙 프로필 영역 */}
      <div className="profile-section">
        <div className="profile-content">
          <div className="profile-image-circle">
            <img src={cameraIcon} alt="camera" className="camera-icon-img" />
          </div>

          <div className="profile-info-side">
            <div className="user-name-container">
              <span className="user-name">{userName}</span>
            </div>
            <button className="edit-profile-btn">프로필 편집</button>
            <div className="toggle-bar">
              <div className="toggle-content-wrapper">
                <img src={groupIcon} alt="visibility icon" className="toggle-icon-img" />
                <div className="toggle-text">
                  <p className="toggle-title">공부 시간 공개</p>
                  <p className="toggle-subtitle">공부 시간이 비공개로 설정되어 있습니다</p>
                </div>
              </div>
              <label className="toggle-switch-container">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* 3. 하단 대칭 섹션 */}
      <div className="section-divider-container">
        <hr className="gray-line" />
        <div className="bottom-content-area">
          
          <div className="study-section">
            <h2 className="section-title">내 누적 공부시간</h2>
            {/* 여기에 카드가 추가될 예정입니다 */}
          </div>

          <div className="study-section">
            <h2 className="section-title">전체 공부시간</h2>
            {/* 여기에 카드가 추가될 예정입니다 */}
          </div>

        </div>
      </div>
    </div>
  );
}