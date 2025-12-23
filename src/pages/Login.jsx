
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Login.css';
import logo from '../assets/images/logo.svg'; 
import PasswordField from '../components/PasswordField'; 
import SignupForm from './Singupfrom.jsx';
import ResetPasswordForm from './ResetPasswordForm';
import Input from '../components/Inputtype';
import { loginApi } from '../utils/axiosInstance'; 

export default function Login() {
  const [view, setView] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

  // ---------------------------------------------------------
  // [추가] 로그인 페이지 전용 탭 제목 및 파비콘 설정
  // ---------------------------------------------------------
  useEffect(() => {
    // 1. 탭 제목을 "로그인"으로 변경
    document.title = "로그인";

    // 2. 파비콘 업데이트 로직 (개인 페이지, 타이머와 동일)
    const updateFavicon = () => {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'shortcut icon';
      // 수정된 viewBox가 즉시 반영되도록 버전 쿼리를 붙입니다.
      document.getElementsByTagName('head')[0].appendChild(link);
    };

    updateFavicon();
  }, []); 
  // ---------------------------------------------------------

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await loginApi({ email, password });

      if (response.status === 200) {
        alert('로그인에 성공했습니다!');
        // ⭐ 로그인 성공 시에만 타이머로 이동
        navigate('/timer'); 
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="container"> 
      {view === 'login' && (
        <div id="loginContainer">
          {/* 여기서 사용되는 logo이미지도 파비콘과 동일한 svg 파일을 사용하게 됩니다 */}
          <img src={logo} className="logo" alt="logo" />
          <form className="login-box" onSubmit={handleLoginSubmit}>
            <Input 
              type="email" 
              placeholder="이메일을 입력하세요" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <PasswordField 
              id="password" 
              placeholder="비밀번호를 입력하세요" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">확인</button>
            <div className="links">
              <a href="#" onClick={(e) => { e.preventDefault(); setView('reset'); }}>비밀번호 재설정</a>
              <a href="#" onClick={(e) => { e.preventDefault(); setView('signup'); }}>회원가입</a>
            </div>
          </form>
        </div>
      )}

      {view === 'signup' && <SignupForm onBack={() => setView('login')} />}
      {view === 'reset' && <ResetPasswordForm onBack={() => setView('login')} />}
    </div>
  );
}
