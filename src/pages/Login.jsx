import { useEffect } from 'react';
import './Login.css';

import logo from '../assets/images/logo.svg';
import eye from '../assets/images/eye.svg';
import eyeOff from '../assets/images/eye off.svg';

export default function Login() {
  useEffect(() => {
    const togglePassword = (inputId, toggleId) => {
      const input = document.getElementById(inputId);
      const toggle = document.getElementById(toggleId);
      if (!input || !toggle) return;

      toggle.onclick = () => {
        const hidden = input.type === 'password';
        input.type = hidden ? 'text' : 'password';
        toggle.src = hidden ? eye : eyeOff;
      };
    };

    togglePassword('password', 'togglePassword');
    togglePassword('signupPassword', 'toggleSignupPassword');
    togglePassword('signupPasswordConfirm', 'toggleSignupPasswordConfirm');
    togglePassword('newPassword', 'toggleNewPassword');
    togglePassword('confirmNewPassword', 'toggleConfirmNewPassword');

    const loginContainer = document.getElementById('loginContainer');
    const signupContainer = document.getElementById('signupContainer');
    const resetContainer = document.getElementById('resetPasswordContainer');

    document.getElementById('signupLink').onclick = (e) => {
      e.preventDefault();
      loginContainer.classList.add('hidden');
      signupContainer.classList.remove('hidden');
    };

    document.getElementById('findPasswordLink').onclick = (e) => {
      e.preventDefault();
      loginContainer.classList.add('hidden');
      resetContainer.classList.remove('hidden');
    };
  }, []);

  return (
    <>
      {/* 로그인 */}
      <div className="container" id="loginContainer">
        <img src={logo} className="logo" />

        <form className="login-box">
          <input type="email" id="email" placeholder="이메일을 입력하세요" />

          <div className="password-field">
            <input type="password" id="password" placeholder="비밀번호를 입력하세요" />
            <img src={eyeOff} id="togglePassword" className="toggle-password" />
          </div>

          <button>확인</button>
          <div id="warningArea"></div>

          <div className="links">
            <a href="#" id="findPasswordLink">비밀번호 재설정</a>
            <a href="#" id="signupLink">회원가입</a>
          </div>
        </form>
      </div>

      {/* 회원가입 */}
      <div className="container hidden" id="signupContainer">
        <form className="login-box">
          <div className="welcome-text">환영해요!</div>

          <input id="signupName" placeholder="이름" />
          <input id="signupEmail" placeholder="이메일" />

          <div className="select-group">
            <select><option>1학년</option></select>
            <select><option>1반</option></select>
          </div>

          <div className="password-field">
            <input type="password" id="signupPassword" placeholder="비밀번호" />
            <img src={eyeOff} id="toggleSignupPassword" className="toggle-password" />
          </div>

          <div className="password-field">
            <input type="password" id="signupPasswordConfirm" placeholder="비밀번호 재확인" />
            <img src={eyeOff} id="toggleSignupPasswordConfirm" className="toggle-password" />
          </div>

          <button>확인</button>
          <div id="signupWarningArea"></div>
        </form>
      </div>

      {/* 비밀번호 재설정
      <div className="container hidden" id="resetPasswordContainer">
        <form className="login-box">
          <div className="welcome-text">새 비밀번호 설정</div>

          <div className="password-field">
            <input type="password" id="newPassword" placeholder="새 비밀번호" />
            <img src={eyeOff} id="toggleNewPassword" className="toggle-password" />
          </div>

          <div className="password-field">
            <input type="password" id="confirmNewPassword" placeholder="새 비밀번호 확인" />
            <img src={eyeOff} id="toggleConfirmNewPassword" className="toggle-password" />
          </div>

          <button>확인</button>
          <div id="resetPasswordWarningArea"></div>
        </form>
      </div>
    </>
  );
}
  */} </>)}