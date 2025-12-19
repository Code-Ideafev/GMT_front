import { useState } from 'react';
import PasswordField from '../components/PasswordField';
import Input from '../components/Inputtype';

export default function SingupForm({ onBack }) {
  // 1. 상태 관리 (비밀번호와 재확인 비밀번호)
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 💡 조건 1: 비밀번호가 4자리 숫자가 아닐 때
  const showPasswordWarning = password.length > 0 && !/^\d{4}$/.test(password);

  // 💡 조건 2: 재확인 칸에 입력을 시작했는데, 원래 비밀번호와 다를 때
  const showConfirmWarning = confirmPassword.length > 0 && password !== confirmPassword;

  return (
    <div id="signupContainer">
      <form className="login-box" id="signupForm" onSubmit={(e) => e.preventDefault()}>
        <div className="welcome-text">환영해요!</div>
        
        <Input placeholder="이름" />
        <Input placeholder="이메일" />

        <div className="select-group">
          <select>
            <option>1학년</option><option>2학년</option><option>3학년</option>
          </select>
          <select>
            <option>1반</option><option>2반</option><option>3반</option><option>4반</option>
          </select>
        </div>

        {/* --- 비밀번호 입력 칸 --- */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField 
            id="signupPassword" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {showPasswordWarning && (
            <div style={warningStyle}>
              4자리의 숫자 조합으로 비밀번호를 생성해주세요!
            </div>
          )}
        </div>

        {/* --- 비밀번호 재확인 입력 칸 --- */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField 
            id="signupPasswordConfirm" 
            placeholder="비밀번호 재확인" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {showConfirmWarning && (
            <div style={warningStyle}>
              비밀번호가 일치하지 않아요!
            </div>
          )}
        </div>

        <button onClick={onBack}>확인</button>
        <div id="signupWarningArea"></div>
      </form>
    </div>
  );
}

// 공통 경고창 스타일
const warningStyle = {
  color: '#ff4d4d',
  fontSize: '12px',
  marginTop: '-12px',
  marginBottom: '15px',
  paddingLeft: '5px'
};