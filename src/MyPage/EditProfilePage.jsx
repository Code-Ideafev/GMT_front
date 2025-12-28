import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector1.svg"; 
import defaultProfile from "./Group 92.svg"; 

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [tempImage, setTempImage] = useState(null);

  // 로컬스토리지에서 기존 이미지 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("userProfileImage");
    setTempImage(saved);
  }, []);

  // 이미지 선택 및 변환
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

  // ✅ 서버 연동 없이 로컬스토리지에만 바로 저장
  const handleComplete = () => {
    if (tempImage) {
      localStorage.setItem("userProfileImage", tempImage);
    } else {
      localStorage.removeItem("userProfileImage");
    }

    alert("프로필 사진이 변경되었습니다.");
    navigate("/MyPage");
  };

  return (
    <div className="mypage-container">
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate(-1)}>
          <button className="clock-btn">
            <div className="icon-stack">
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