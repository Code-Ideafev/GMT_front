import { BrowserRouter, Routes, Route } from "react-router-dom";
import MyPage from "./MyPage/my-page";
// 🟢 프로필 편집 페이지 임포트 추가
import EditProfilePage from "./MyPage/EditProfilePage"; 

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 기존 코드 유지 */}
        <Route path="/MyPage" element={<MyPage />} />
        
        {/* 🟢 편집 페이지 경로만 추가 */}
        <Route path="/EditProfile" element={<EditProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}