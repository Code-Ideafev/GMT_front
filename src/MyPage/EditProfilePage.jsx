import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector.svg";
import defaultProfile from "./Group 92.svg"; // 기본 이미지 경로

export default function EditProfilePage() {
  const navigate = useNavigate();
  const userName = "김도연";
  
  // 🟢 1. 실제 저장이 아닌, 편집 중인 이미지를 보여주기 위한 임시 상태
  const [tempImage, setTempImage] = useState(null);

  useEffect(() => {
    // 페이지 처음 들어올 때 현재 저장된 프로필 사진을 가져와 임시 상태에 넣음
    const saved = localStorage.getItem("userProfileImage");
    setTempImage(saved);
  }, []);

  // 🟢 2. 사진 업로드 시 (임시 상태만 업데이트)
  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setTempImage(reader.result); // 아직 저장 안 됨, 화면에만 보여줌
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // 🟢 3. 기본 사진으로 리셋 시 (임시 상태만 업데이트)
  const handleReset = () => {
    setTempImage(null); // 아직 저장 안 됨, 화면에만 기본 이미지로 바뀜
  };

  // 🟢 4. 완료 버튼을 눌렀을 때 비로소 저장!
  const handleComplete = () => {
    if (tempImage) {
      localStorage.setItem("userProfileImage", tempImage);
    } else {
      localStorage.removeItem("userProfileImage"); // tempImage가 null이면 삭제
    }
    // 저장이 완료된 후 이동
    navigate("/MyPage");
  };

  return (
    <div className="mypage-container">
      {/* 상단 헤더 영역 (원본 레이아웃 유지) */}
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate(-1)}>
          <button className="clock-btn">
            <div className="icon-stack">
              <img src={clockIcon} alt="history" className="clock-img base" />
            </div>
          </button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      {/* 중앙 편집 영역 */}
      <div className="edit-section-wrapper">
        {/* 🟢 큰 회색 원: 현재 편집 중인 임시 이미지를 실시간 미리보기 */}
        <div className="profile-image-circle large">
          <img 
            src={tempImage || defaultProfile} 
            alt="profile-preview" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        {/* StudyRecordCard: 사진편집 제목과 업로드/기본사진 버튼 포함 */}
        <StudyRecordCard 
          isEditMode={true} 
          onUploadClick={handleUpload} 
          onResetClick={handleReset} 
        />

        {/* 🟢 최종 완료 버튼 */}
        <button className="complete-btn" onClick={handleComplete}>
          완료
        </button>
      </div>
    </div>
  );
}