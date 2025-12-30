import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector1.svg"; 
import defaultProfile from "./Group 92.svg"; 

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [tempImage, setTempImage] = useState(null);
  
  // ✅ 현재 로그인한 사용자 식별을 위한 이메일
  const myEmail = localStorage.getItem("userEmail")?.trim().toLowerCase();

  useEffect(() => {
    // 로컬스토리지에서 내 계정 전용 이미지 불러오기
    if (myEmail) {
      const saved = localStorage.getItem(`userProfileImage_${myEmail}`);
      setTempImage(saved);
    }
  }, [myEmail]);

  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.src = event.target.result;
          img.onload = () => {
            // 용량 최적화를 위한 Canvas 압축 (로컬스토리지 용량 제한 대비)
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 200; 
            canvas.height = 200;
            ctx.drawImage(img, 0, 0, 200, 200);
            
            const compressedData = canvas.toDataURL("image/jpeg", 0.7);
            setTempImage(compressedData); 
          };
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
    if (!myEmail) {
      alert("로그인 정보가 없습니다.");
      return;
    }

    // ✅ 서버 연동 없이 로컬스토리지에만 저장
    if (tempImage) {
      localStorage.setItem(`userProfileImage_${myEmail}`, tempImage);
    } else {
      localStorage.removeItem(`userProfileImage_${myEmail}`);
    }

    alert("프로필 사진이 변경되었습니다.");
    navigate("/MyPage");
  };

  return (
    <div className="mypage-container">
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate(-1)} style={{cursor: 'pointer'}}>
          <button className="clock-btn">
            <div className="icon-stack">
              <img src={clockIcon} alt="back" className="clock-img base" />
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
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} 
          />
        </div>

        <StudyRecordCard 
          isEditMode={true} 
          onUploadClick={handleUpload} 
          onResetClick={handleReset} 
          profileImage={tempImage || defaultProfile}
        />

        <button className="complete-btn" onClick={handleComplete}>
          완료
        </button>
      </div>
    </div>
  );
}