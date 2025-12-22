import { useState } from 'react';
import PasswordField from '../components/PasswordField';
import Input from '../components/Inputtype';
import { ChevronDown, ChevronUp, Check } from 'lucide-react';
import { signUpApi } from '../utils/axiosInstance';

export default function SingupForm({ onBack }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('1학년');
  const [room, setRoom] = useState('1반');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isAgreed, setIsAgreed] = useState(false);

  const isEmailInvalid = email.length > 0 && !email.endsWith('@gsm.hs.kr');
  const isPasswordInvalid = password.length > 0 && !/^\d{4}$/.test(password);
  const isConfirmInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!isAgreed) return alert("개인정보 약관에 동의해주세요.");
    if (!name || !email || !password) return alert("모든 정보를 입력해주세요.");

    try {
      // 명세서 규격에 맞게 객체 생성 후 서버 전송
      const response = await signUpApi({
        name,
        email,
        grade,
        class: room,
        password
      });

      if (response.status === 200 || response.status === 201) {
        alert("회원가입 성공! 로그인 해주세요.");
        onBack();
      }
    } catch (error) {
      console.error("회원가입 에러:", error);
      // 서버에서 보내주는 에러 메시지가 있다면 출력, 없다면 기본 메시지 출력
      const errorMsg = error.response?.data?.message || "이미 가입된 이메일이거나 서버 오류입니다.";
      alert(`회원가입 실패: ${errorMsg}`);
    }
  };

  return (
    <div id="signupContainer">
      <form className="login-box" id="signupForm" onSubmit={handleSignUp}>
        <div className="welcome-text">환영해요!</div>
        
        <Input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
        
        <div style={{ width: '100%', textAlign: 'left' }}>
          <Input placeholder="이메일 (@gsm.hs.kr)" value={email} onChange={(e) => setEmail(e.target.value)} />
          {isEmailInvalid && <div style={warningStyle}>학교 이메일 형식을 확인해주세요!</div>}
        </div>

        <div className="select-group">
          <select value={grade} onChange={(e) => setGrade(e.target.value)}>
            <option>1학년</option><option>2학년</option><option>3학년</option>
          </select>
          <select value={room} onChange={(e) => setRoom(e.target.value)}>
            <option>1반</option><option>2반</option><option>3반</option><option>4반</option>
          </select>
        </div>

        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField id="signupPassword" placeholder="비밀번호 설정" value={password} onChange={(e) => setPassword(e.target.value)} />
          {isPasswordInvalid && <div style={warningStyle}>4자리 숫자로 입력해주세요!</div>}
        </div>

        <div style={{ width: '100%', textAlign: 'left' }}>
          <PasswordField id="signupPasswordConfirm" placeholder="비밀번호 확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          {isConfirmInvalid && <div style={warningStyle}>비밀번호가 일치하지 않아요!</div>}
        </div>

        <div className="privacy-container">
          <div className="privacy-header" onClick={() => setIsPrivacyOpen(!isPrivacyOpen)}>
            <span>개인정보 수집 및 이용약관 안내</span>
            {isPrivacyOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
          </div>
          <div className="privacy-checkbox-area" onClick={() => setIsAgreed(!isAgreed)}>
            <div className={`custom-checkbox ${isAgreed ? 'checked' : ''}`}>
              {isAgreed && <Check size={14} color="#ff4d4d" />}
            </div>
            <label>동의합니다 (필수)</label>
          </div>
        </div>

        <button type="submit">확인</button>
      </form>
    </div>
  );
}

const warningStyle = { color: '#ff4d4d', fontSize: '12px', marginTop: '-12px', marginBottom: '15px' };