import PasswordField from './PasswordField';

export default function ResetPasswordForm({ onBack }) {
  return (
    <form className="login-box" onSubmit={(e) => e.preventDefault()}>
      <div className="welcome-text">새 비밀번호 설정</div>
      <PasswordField id="newPassword" placeholder="새 비밀번호" />
      <PasswordField id="confirmNewPassword" placeholder="새 비밀번호 확인" />
      <button onClick={onBack}>확인</button>
    </form>
  );
}