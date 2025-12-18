import React from "react";
import { useNavigate } from "react-router-dom";
import clockIcon from "./Vector1.svg"; // 아이콘 변경
import cameraIcon from "./Camera.svg";
import StudyRecordCard from "../components/StudyRecordCard";

export default function EditProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="edit-profile-container">
      {/* 1. 상단 돌아가기 영역 (아이콘 변경됨) */}
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
          <button className="clock-btn">
            <img src={clockIcon} alt="back" />
          </button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      {/* 2. 중앙 편집 영역 */}
      <div className="edit-content-section">
        {/* 기존 회색 큰 원 */}
        <div className="profile-image-circle large">
          <img src={cameraIcon} alt="camera" className="camera-icon-img" />
        </div>

        {/* 3. StudyRecordCard (isEditMode={true}로 사진 편집 섹션 출력) */}
        <StudyRecordCard isEditMode={true} />

        {/* 4. 완료 버튼 (CSS에서 크기 160x44 적용) */}
        <button className="complete-btn" onClick={() => navigate(-1)}>
          완료
        </button>
      </div>
    </div>
  );
}