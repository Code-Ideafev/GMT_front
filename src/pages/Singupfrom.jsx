import { useState } from 'react';
import PasswordField from '../components/PasswordField';
import Input from '../components/Inputtype';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function SingupForm({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  // 실시간 유효성 경고 메시지 조건
  const isEmailInvalid = email.length > 0 && !email.endsWith('@gsm.hs.kr');
  const isPasswordInvalid = password.length > 0 && !/^\d{4}$/.test(password);
  const isConfirmInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSignUp = (e) => {
    e.preventDefault();

    // ⭐ 동의 안 하면 못 넘어가게 하는 핵심 기능 ⭐
    if (!isAgreed) {
      alert("개인정보 수집 및 이용에 동의해야 가입이 가능합니다.");
      return; // 함수 종료 (가입 프로세스 중단)
    }

    // 기타 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      alert("모든 정보를 입력해주세요!");
      return;
    }

    if (isEmailInvalid || isPasswordInvalid || isConfirmInvalid) {
      alert("입력한 정보를 다시 확인해주세요.");
      return;
    }

    // 모든 조건 통과 시
    alert("회원가입 성공!");
    onBack();
  };

  return (
    <div id="signupContainer">
      <form className="login-box" id="signupForm" onSubmit={handleSignUp}>
        <div className="welcome-text">환영해요!</div>
        
        <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
        
        <div style={{ width: '100%', textAlign: 'left' }}>
          <Input placeholder="이메일 (@gsm.hs.kr)" value={email} onChange={(e) => setEmail(e.target.value)} />
          {isEmailInvalid && <div style={warningStyle}>학교 이메일(@gsm.hs.kr) 형식을 확인해주세요!</div>}
        </div>

        <div className="select-group">
          <select><option>1학년</option><option>2학년</option><option>3학년</option></select>
          <select><option>1반</option><option>2반</option><option>3반</option><option>4반</option></select>
        </div>

        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField id="signupPassword" placeholder="비밀번호 설정" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isPasswordInvalid && <div style={warningStyle}>4자리의 숫자 조합으로 비밀번호를 생성해주세요!</div>}
        </div>

        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField id="signupPasswordConfirm" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {isConfirmInvalid && <div style={warningStyle}>비밀번호가 일치하지 않아요!</div>}
        </div>

        <div className="privacy-container">
          <div className="privacy-header" onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
            <span>개인정보 수집 및 이용 안내</span>
            {isPrivacyOpen ? <ChevronUp size={16} color="#ababab" /> : <ChevronDown size={16} color="#ababab" />}
          </div>
          
          {isPrivacyOpen && (
            <div className="privacy-content">
              <strong>1. 수집 항목</strong>: 이름, 이메일, 학년/반, 비밀번호<br />
              <strong>2. 수집 목적</strong>: 서비스 운영 및 본인 확인<br />
              <strong>3. 보유 기간</strong>: 서비스 탈퇴 시까지
            </div>
          )}

          <div className="privacy-checkbox-area">
            <input 
              type="checkbox" 
              id="privacy-check" 
              checked={isAgreed} 
              onChange={(e) => setIsAgreed(e.target.checked)} 
            />
            <label htmlFor="privacy-check">개인정보 수집 및 이용에 동의합니다 (필수)</label>
          </div>
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