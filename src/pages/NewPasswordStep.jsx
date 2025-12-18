import PasswordField from '../components/PasswordField';

export default function NewPasswordStep({ onFinish }) {
  return (
    <form className="login-box" onSubmit={(e) => e.preventDefault()}>
      <PasswordField id="newPassword" placeholder="새 비밀번호" />
      <PasswordField id="confirmNewPassword" placeholder="새 비밀번호 확인" />
      <button onClick={onFinish}>변경 완료</button>
    </form>
  );
}