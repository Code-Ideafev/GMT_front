import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./my-page.css";
import StudyRecordCard from "../components/StudyRecordCard";
import clockIcon from "./Vector1.svg"; 
import defaultProfile from "./Group 92.svg"; 
// ✅ 추가: API 함수 임포트
import { updateProfileApi } from '../api/apiClient';

export default function EditProfilePage() {
  const navigate = useNavigate();
  const [tempImage, setTempImage] = useState(null);

  // 로컬스토리지에서 기존 이미지 불러오기
  useEffect(() => {
    const saved = localStorage.getItem("userProfileImage");
    setTempImage(saved);
  }, []);

  // 이미지 선택 및 변환 (Canvas 압축 포함)
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
            // ✅ 권장 방식: 너무 긴 문자열은 403 에러를 유발하므로 압축 진행
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = 250; 
            canvas.height = 250;
            ctx.drawImage(img, 0, 0, 250, 250);
            
            // jpeg 형식의 문자열로 변환
            const compressedData = canvas.toDataURL("image/jpeg", 0.8);
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

  // ✅ [수정] 서버 연동 및 완료 처리
  const handleComplete = async () => {
    try {
      // 1. 서버에 문자열 데이터 전송
      const response = await updateProfileApi(tempImage || "");

      // 2. 서버 응답이 성공하면 로컬 스토리지 업데이트
      // 서버에서 저장된 최종 URL을 내려준다면 response.data.profileImageUrl 등을 쓰면 더 좋습니다.
      if (tempImage) {
        localStorage.setItem("userProfileImage", tempImage);
      } else {
        localStorage.removeItem("userProfileImage");
      }

      alert("프로필 사진이 변경되었습니다.");
      navigate("/MyPage");
    } catch (error) {
      console.error("프로필 변경 실패:", error);
      if (error.response?.status === 403) {
        alert("접근 권한이 없습니다. 다시 로그인해 주세요.");
      } else {
        alert("서버 통신 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="mypage-container">
      <div className="header-area">
        <div className="icon-wrapper" onClick={() => navigate(-1)} style={{cursor: 'pointer'}}>
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