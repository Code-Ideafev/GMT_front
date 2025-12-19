import { useState } from 'react';
import './Login.css';
import logo from '../assets/images/logo.svg'; 
import PasswordField from '../components/PasswordField'; 
import SignupForm from './Singupfrom.jsx';
import ResetPasswordForm from './ResetPasswordForm';
import Input from '../components/Inputtype.jsx';

export default function Login() {
  const [view, setView] = useState('login');

  return (
    <div className="container"> 
      {view === 'login' && (
        <div id="loginContainer">
          <img src={logo} className="logo" alt="logo" />
          <form className="login-box" onSubmit={(e) => e.preventDefault()}>
            <Input type="email" placeholder="이메일을 입력하세요" />
            <PasswordField id="password" placeholder="비밀번호를 입력하세요" />
            <button>확인</button>
            <div className="links">
              <a href="#" onClick={() => setView('reset')}>비밀번호 재설정</a>
              <a href="#" onClick={() => setView('signup')}>회원가입</a>
            </div>
          </form>
        </div>
      )}

      {view === 'signup' && <SignupForm onBack={() => setView('login')} />}
      {view === 'reset' && <ResetPasswordForm onBack={() => setView('login')} />}
    </div>
  );
}