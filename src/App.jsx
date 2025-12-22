import { Routes, Route } from 'react-router-dom';
import Timer from './timer/Timer.jsx';
import Login from './pages/Login'; // 도연님 파일 import 추가

export default function App() {
  return (
    <Routes>
      {/* 친구의 최신 메인 페이지 (Timer) */}
      <Route path="/" element={<Timer />} /> 
      
      {/* 도연님의 로그인 페이지 경로 추가 */}
      <Route path="/login" element={<Login />} /> 
    </Routes>
  );
}