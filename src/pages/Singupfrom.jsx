import { useState } from 'react';
import PasswordField from '../components/PasswordField';
import Input from '../components/Inputtype';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';

export default function SingupForm({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // ⭐ 여기를 true에서 false로 바꿨어요! (처음에 닫혀있음)
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const isEmailInvalid = email.length > 0 && !email.endsWith('@gsm.hs.kr');
  const isPasswordInvalid = password.length > 0 && !/^\d{4}$/.test(password);
  const isConfirmInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!isAgreed) {
      alert("개인정보 수집 및 이용에 동의해야 가입이 가능합니다.");
      return;
    }
    if (!name || !email || !password || !confirmPassword) {
      alert("모든 정보를 입력해주세요!");
      return;
    }
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

        {/* 개인정보 박스 */}
        <div className="privacy-container">
          <div className="privacy-header" onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
            <span>개인정보 수집 및 이용 안내</span>
            {isPrivacyOpen ? <ChevronUp size={20} color="#666" /> : <ChevronDown size={20} color="#666" />}
          </div>
          
          {isPrivacyOpen && (
            <div className="privacy-content">
              <strong>1. 수집 항목</strong><br />이름, 이메일 주소, 비밀번호<br /><br />
              <strong>2. 수집 목적</strong><br />• 회원 식별 및 관리<br />• 서비스 제공 및 공지사항 전달<br /><br />
              <strong>3. 보유 및 이용 기간</strong><br />회원 탈퇴 시까지<br />
              <div className="privacy-inner-box">
                이용자는 개인정보 수집 및 이용에 대한 동의를 거부할 권리가 있으며, 동의를 거부할 경우 회원가입이 제한될 수 있습니다.
              </div>
            </div>
          )}

          {/* 바탕색 없이 체크 표시만 색깔 있게 */}
          <div className="privacy-checkbox-area" onClick={() => setIsAgreed(!isAgreed)}>
            <div className={`custom-checkbox ${isAgreed ? 'checked' : ''}`}>
              {isAgreed && <Check size={14} color="#ff4d4d" strokeWidth={3} />}
            </div>
            <input 
              type="checkbox" 
              className="hidden-checkbox"
              checked={isAgreed} 
              readOnly
            />
            <label>개인정보 수집 및 이용에 동의합니다 (필수)</label>
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