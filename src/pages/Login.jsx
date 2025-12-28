import { useState, useEffect } from 'react';
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

  // 1. 탭 제목 및 파비콘 설정 (혜린님 기존 코드 100% 유지)
  useEffect(() => {
    document.title = "로그인";
    const updateFavicon = () => {
      let link = document.querySelector("link[rel*='icon']") || document.createElement('link');
      link.type = 'image/svg+xml';
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    };
    updateFavicon();
  }, []); 

  // 2. 로그인 제출 함수
  const handleLoginSubmit = async (e) => {
    e.preventDefault(); 

    try {
      const response = await loginApi({ email, password });

      if (response.status === 200) {
        const token = response.data.accessToken || response.data.token; 

        if (token) {
          // 브라우저 보관함에 입장권 저장
          localStorage.setItem('accessToken', token); 
          
          // ⭐ [중요 추가] 마이페이지에서 "나"를 찾기 위해 이메일을 저장합니다!
          localStorage.setItem('userEmail', email); 
          
          console.log("토큰 및 이메일 저장 성공");
        }

        alert('로그인에 성공했습니다!');
        navigate('/timer'); 
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('로그인 실패: 아이디 또는 비밀번호를 확인하거나 서버 연결을 확인해주세요.');
    }
  };

  return (
    <div className="container"> 
      {view === 'login' && (
        <div id="loginContainer">
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