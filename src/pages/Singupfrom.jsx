import { useState } from 'react';
import PasswordField from '../components/PasswordField';
import Input from '../components/Inputtype';

export default function SingupForm({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 💡 실시간 경고 조건들
  // 이메일이 입력됐는데 @gsm.hs.kr로 끝나지 않으면 경고!
  const isEmailInvalid = email.length > 0 && !email.endsWith('@gsm.hs.kr');
  const isPasswordInvalid = password.length > 0 && !/^\d{4}$/.test(password);
  const isConfirmInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSignUp = (e) => {
    e.preventDefault();

    // 1. 이름/이메일 빈칸 체크
    if (!name || !email) {
      alert("이름과 이메일을 모두 입력해주세요!");
      return;
    }

    // 2. 이메일 도메인 최종 체크
    if (!email.endsWith('@gsm.hs.kr')) {
      alert("학교 이메일(@gsm.hs.kr)만 사용 가능합니다!");
      return;
    }

    // 3. 비밀번호 숫자 4자리 체크
    if (!/^\d{4}$/.test(password)) {
      alert("비밀번호는 4자리 숫자로 입력해주세요!");
      return;
    }

    // 4. 비밀번호 일치 체크
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    alert("회원가입 성공!");
    onBack();
  };

  return (
    <div id="signupContainer">
      <form className="login-box" id="signupForm" onSubmit={handleSignUp}>
        <div className="welcome-text">환영해요!</div>
        
        <Input 
          placeholder="이름" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
        />

        <div style={{ width: '100%', textAlign: 'left' }}>
          <Input 
            placeholder="이메일 (@gsm.hs.kr)" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {/* ⭐ 이메일 도메인 경고 문구 */}
          {isEmailInvalid && (
            <div style={warningStyle}>학교 이메일(@gsm.hs.kr) 형식을 확인해주세요!</div>
          )}
        </div>

        <div className="select-group">
          <select><option>1학년</option><option>2학년</option><option>3학년</option></select>
          <select><option>1반</option><option>2반</option><option>3반</option><option>4반</option></select>
        </div>

        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField 
            id="signupPassword" 
            placeholder="비밀번호" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isPasswordInvalid && <div style={warningStyle}>4자리의 숫자 조합으로 비밀번호를 생성해주세요!</div>}
        </div>

        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField 
            id="signupPasswordConfirm" 
            placeholder="비밀번호 재확인" 
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {isConfirmInvalid && <div style={warningStyle}>비밀번호가 일치하지 않아요!</div>}
        </div>

        <button type="submit">확인</button>
      </form>
    </div>
  );
}

const warningStyle = {
  color: '#ff4d4d',
  fontSize: '12px',
  marginTop: '-12px',
  marginBottom: '15px',
  paddingLeft: '5px'
};