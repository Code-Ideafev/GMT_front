import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import clockIcon from "./Vector1.svg"; 
import cameraIcon from "./Camera.svg";
import StudyRecordCard from "../components/StudyRecordCard";
import "../components/StudyRecordCard.css"; 

export default function EditProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="edit-profile-container">
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate(-1)}>
          <button className="clock-btn">
            <img src={clockIcon} alt="back" className="nav-icon-svg" />
          </button>
          <span className="back-text">돌아가기</span>
        </div>
      </div>

      <div className="edit-content-section">
        <div className="profile-image-circle large">
          <img src={cameraIcon} alt="camera" className="camera-icon-img" />
        </div>
        
        <StudyRecordCard isEditMode={true} />

        <button className="complete-btn" onClick={() => navigate(-1)}>
          완료
        </button>
      </div>
    </div>
  );
}