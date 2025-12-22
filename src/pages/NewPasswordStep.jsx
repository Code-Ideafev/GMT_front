import { useState } from 'react';
import PasswordField from '../components/PasswordField';

export default function NewPasswordStep({ onFinish }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 유효성 검사 로직
  const isPasswordInvalid = password.length > 0 && !/^\d{4}$/.test(password);
  const isConfirmInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = (e) => {
    e.preventDefault();

    // 4자리 숫자인지 확인
    if (!/^\d{4}$/.test(password)) {
      alert("비밀번호는 4자리 숫자로 설정해주세요!");
      return;
    }

    // 일치 여부 확인
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    onFinish();
  };

  return (
    <form className="login-box" onSubmit={handleSubmit}>
      <div style={{ width: '100%', textAlign: 'left' }}>
        <PasswordField 
          id="newPassword" 
          placeholder="새 비밀번호 (숫자 4자리)" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {isPasswordInvalid && <div style={warningStyle}>4자리의 숫자 조합으로 설정해주세요!</div>}
      </div>

      <div style={{ width: '100%', textAlign: 'left' }}>
        <PasswordField 
          id="confirmNewPassword" 
          placeholder="새 비밀번호 확인" 
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {isConfirmInvalid && <div style={warningStyle}>비밀번호가 일치하지 않아요!</div>}
      </div>

      <button type="submit">변경 완료</button>
    </form>
  );
}

// 회원가입 페이지와 동일한 경고 스타일
const warningStyle = {
  color: '#ff4d4d',
  fontSize: '12px',
  marginTop: '-12px',
  marginBottom: '15px',
  paddingLeft: '5px'
};