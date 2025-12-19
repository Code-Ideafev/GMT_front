import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector1.svg"; // 사람 모양 아이콘
import defaultProfile from "./Group 92.svg"; // 기본 이미지 경로

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [tempImage, setTempImage] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("userProfileImage");
    setTempImage(saved);
  }, []);

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          setTempImage(reader.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    setTempImage(null);
  };

  const handleComplete = () => {
    if (tempImage) {
      localStorage.setItem("userProfileImage", tempImage);
    } else {
      localStorage.removeItem("userProfileImage");
    }
    navigate("/MyPage");
  };

  return (
    <div className="mypage-container">
      <div className="header-area">
        {/* 🟢 icon-wrapper로 감싸서 호버 범위를 넓힘 */}
        <div className="icon-wrapper" onClick={() => navigate(-1)}>
          <button className="clock-btn">
            <div className="icon-stack">
              {/* 🟢 base와 hover 두 장의 이미지가 필요합니다 */}
              <img src={clockIcon} alt="back" className="clock-img base" />
              <img src={clockIcon} alt="back" className="clock-img hover" />
            </div>
          </button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      <div className="edit-section-wrapper">
        <div className="profile-image-circle large">
          <img 
            src={tempImage || defaultProfile} 
            alt="profile-preview" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </div>

        <StudyRecordCard 
          isEditMode={true} 
          onUploadClick={handleUpload} 
          onResetClick={handleReset} 
        />

        <button className="complete-btn" onClick={handleComplete}>
          완료
        </button>
      </div>
    </div>
  );
}