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
    
    // 이메일 형식이 맞는지 간단히 체크 (추천 기능을 쓰므로 입력된 값 그대로 전송)
    if (!email.includes('@gsm.hs.kr')) {
      alert("학교 이메일(@gsm.hs.kr) 형식을 확인해주세요.");
      return;
    }

    try {
      const response = await loginApi({ email, password });
      if (response.status === 200) {
        const token = response.data.accessToken || response.data.token; 
        if (token) {
          localStorage.setItem('accessToken', token); 
          localStorage.setItem('userEmail', email); 
        }
        alert('로그인에 성공했습니다!');
        navigate('/timer'); 
      }
    } catch (error) {
      alert('로그인 실패: 아이디 또는 비밀번호를 확인해주세요.');
    }
  };

  return (
    <div className="container"> 
      {view === 'login' && (
        <div id="loginContainer">
          <img src={logo} className="logo" alt="logo" />
          <form className="login-box" onSubmit={handleLoginSubmit}>
            <Input 
              list="login-email-options"
              placeholder="학교 이메일을 입력하세요" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <datalist id="login-email-options">
              {email && !email.includes('@') && <option value={`${email}@gsm.hs.kr`} />}
            </datalist>
            
            <PasswordField 
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