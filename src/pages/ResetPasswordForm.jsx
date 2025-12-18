import PasswordField from '../components/PasswordField';

export default function ResetPasswordForm({ onBack }) {
  return (
    // CSS의 #resetPasswordContainer 스타일 적용을 위해 감싸기
    <div id="resetPasswordContainer">
      <form className="login-box" id="resetPasswordForm" onSubmit={(e) => e.preventDefault()}>
        <div className="welcome-text">새 비밀번호 설정</div>
        <PasswordField id="newPassword" placeholder="새 비밀번호" />
        <PasswordField id="confirmNewPassword" placeholder="새 비밀번호 확인" />
        <button onClick={onBack}>확인</button>
        <div id="resetPasswordWarningArea"></div>
      </form>
    </div>
  );
}