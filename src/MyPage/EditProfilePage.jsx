import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clockIcon from "./Vector1.svg"; 
import cameraIcon from "./Camera.svg";
import StudyRecordCard from "../components/StudyRecordCard";

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [previewImage, setPreviewImage] = useState(localStorage.getItem("userProfileImage"));

  // 사진 업로드 핸들러
  const handleUpload = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          localStorage.setItem("userProfileImage", reader.result); // 로컬 저장
          setPreviewImage(reader.result); // 즉시 반영
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const handleReset = () => {
    localStorage.removeItem("userProfileImage");
    setPreviewImage(null);
  };

  return (
    <div className="edit-profile-container">
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate(-1)}>
          <button className="clock-btn"><img src={clockIcon} alt="back" className="nav-icon-svg" /></button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      <div className="edit-content-section">
        <div className="profile-image-circle large" style={{ overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {previewImage ? (
            <img src={previewImage} alt="profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <img src={cameraIcon} alt="camera" className="camera-icon-img" />
          )}
        </div>
        
        {/* StudyRecordCard의 편집모드를 호출하여 업로드 기능 연결 */}
        <StudyRecordCard 
          isEditMode={true} 
          onUploadClick={handleUpload} 
          onResetClick={handleReset} 
        />

        <button className="complete-btn" onClick={() => navigate(-1)} style={{ marginTop: '20px' }}>완료</button>
      </div>
    </div>
  );
}