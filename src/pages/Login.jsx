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
  const [emailId, setEmailId] = useState(''); // 아이디 부분만 관리
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); 

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

  const handleLoginSubmit = async (e) => {
    e.preventDefault(); 
    const fullEmail = `${emailId}@gsm.hs.kr`; // 서버로 보낼 때 결합

    try {
      const response = await loginApi({ email: fullEmail, password });
      if (response.status === 200) {
        const token = response.data.accessToken || response.data.token; 
        if (token) {
          localStorage.setItem('accessToken', token); 
          localStorage.setItem('userEmail', fullEmail); 
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
            {/* 도메인 고정 입력창 */}
            <div style={{ position: 'relative', width: '100%' }}>
              <Input 
                type="text" 
                placeholder="학교 아이디 입력" 
                value={emailId}
                onChange={(e) => setEmailId(e.target.value.split('@')[0])}
                style={{ paddingRight: '100px' }}
              />
              <span style={{ position: 'absolute', right: '15px', top: '40%', transform: 'translateY(-50%)', color: '#aaa', fontSize: '14px', pointerEvents: 'none' }}>
                @gsm.hs.kr
              </span>
            </div>
            
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