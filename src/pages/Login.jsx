import { useState } from 'react';
import './Login.css';
import logo from '../assets/images/logo.svg';
import PasswordField from './PasswordField';
import SignupForm from './SignupForm';
import ResetPasswordForm from './ResetPasswordForm';

export default function Login() {
  const [view, setView] = useState('login');

  return (
    <div className="container">
      {/* 1. 로그인 메인 */}
      {view === 'login' && (
        <div id="loginContainer">
          <img src={logo} className="logo" alt="logo" />
          <form className="login-box" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="이메일을 입력하세요" />
            <PasswordField id="password" placeholder="비밀번호를 입력하세요" />
            <button>확인</button>
            <div className="links">
              <a href="#" onClick={() => setView('reset')}>비밀번호 재설정</a>
              <a href="#" onClick={() => setView('signup')}>회원가입</a>
            </div>
          </form>
        </div>
      )}

      {/* 2. 회원가입 컴포넌트 호출 */}
      {view === 'signup' && <SignupForm onBack={() => setView('login')} />}

      {/* 3. 비밀번호 재설정 컴포넌트 호출 */}
      {view === 'reset' && <ResetPasswordForm onBack={() => setView('login')} />}
    </div>
  );
}