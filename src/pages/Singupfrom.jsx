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

  // 실시간 경고 조건
  const isEmailInvalid = email.length > 0 && !email.endsWith('@gsm.hs.kr');
  const isPasswordInvalid = password.length > 0 && !/^\d{4}$/.test(password);
  const isConfirmInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSignUp = (e) => {
    e.preventDefault();

    // 동의 여부 체크
    if (!isAgreed) {
      alert("개인정보 수집 및 이용에 동의해주세요!");
      return;
    }

    // 유효성 검사
    if (!name || !email || !password || !confirmPassword) {
      alert("모든 정보를 입력해주세요!");
      return;
    }
    if (!email.endsWith('@gsm.hs.kr')) {
      alert("학교 이메일만 사용 가능합니다!");
      return;
    }
    if (!/^\d{4}$/.test(password)) {
      alert("비밀번호는 숫자 4자리로 설정해주세요!");
      return;
    }

    alert("회원가입 성공!");
    onBack();
  };

  return (
    <div id="signupContainer">
      <form className="login-box" id="signupForm" onSubmit={handleSignUp}>
        <div className="welcome-text">환영해요!</div>
        
        {/* 이름 입력 */}
        <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
        
        {/* 이메일 입력 */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <Input placeholder="이메일 (@gsm.hs.kr)" value={email} onChange={(e) => setEmail(e.target.value)} />
          {isEmailInvalid && <div style={warningStyle}>학교 이메일(@gsm.hs.kr) 형식을 확인해주세요!</div>}
        </div>

        {/* 학년/반 선택 */}
        <div className="select-group">
          <select><option>1학년</option><option>2학년</option><option>3학년</option></select>
          <select><option>1반</option><option>2반</option><option>3반</option><option>4반</option></select>
        </div>

        {/* 비밀번호 입력 */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField id="signupPassword" placeholder="비밀번호 설정" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isPasswordInvalid && <div style={warningStyle}>4자리의 숫자 조합으로 비밀번호를 생성해주세요!</div>}
        </div>

        {/* 비밀번호 확인 */}
        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField id="signupPasswordConfirm" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {isConfirmInvalid && <div style={warningStyle}>비밀번호가 일치하지 않아요!</div>}
        </div>

        {/* 개인정보 동의 영역 (왼쪽 정렬) */}
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

        {/* 확인 버튼 (항상 초록색) */}
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