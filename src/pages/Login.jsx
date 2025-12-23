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