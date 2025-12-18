import PasswordField from './PasswordField';

export default function SignupForm({ onBack }) {
  return (
    <form className="login-box" id="signupForm" onSubmit={(e) => e.preventDefault()}>
      <div className="welcome-text">환영해요!</div>
      <input placeholder="이름" />
      <input placeholder="이메일" />
      <div className="select-group">
        <select><option>1학년</option><option>2학년</option><option>3학년</option></select>
        <select><option>1반</option><option>2반</option><option>3반</option><option>4반</option></select>
      </div>
      <PasswordField id="signupPassword" placeholder="비밀번호" />
      <PasswordField id="signupPasswordConfirm" placeholder="비밀번호 재확인" />
      <button onClick={onBack}>확인</button>
    </form>
  );
}