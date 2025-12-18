import PasswordField from '../components/PasswordField';

export default function SingupForm({ onBack }) {
  return (
    // 1. CSS의 #signupContainer 스타일을 받기 위해 ID 추가
    <div id="signupContainer">
      {/* 2. CSS의 #signupForm 스타일을 받기 위해 ID 추가 */}
      <form className="login-box" id="signupForm" onSubmit={(e) => e.preventDefault()}>
        <div className="welcome-text">환영해요!</div>
        
        <input placeholder="이름" />
        <input placeholder="이메일" />

        {/* 3. CSS의 .select-group 스타일 (gap: 4% 등) 적용 */}
        <div className="select-group">
          <select>
            <option>1학년</option>
            <option>2학년</option>
            <option>3학년</option>
          </select>
          <select>
            <option>1반</option>
            <option>2반</option>
            <option>3반</option>
            <option>4반</option>
          </select>
        </div>

        <PasswordField id="signupPassword" placeholder="비밀번호" />
        <PasswordField id="signupPasswordConfirm" placeholder="비밀번호 재확인" />

        <button onClick={onBack}>확인</button>
        
        {/* 경고창 영역 스타일 대비 */}
        <div id="signupWarningArea"></div>
      </form>
    </div>
  );
}