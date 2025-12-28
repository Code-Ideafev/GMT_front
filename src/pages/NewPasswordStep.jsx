import { useState } from 'react';
import PasswordField from '../components/PasswordField';
import { resetPasswordApi } from '../utils/axiosInstance'; 

export default function NewPasswordStep({ email, onFinish }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!/^\d{4}$/.test(password)) {
      alert("비밀번호는 4자리 숫자로 설정해주세요!");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    setIsLoading(true);
    try {
      // ⭐ 수정 포인트: 수빈이 명세서 Body { "email", "newPassword" } 맞춤
      await resetPasswordApi({ 
        email: email, 
        newPassword: password 
      });
      onFinish();
    } catch (error) {
      alert("비밀번호 변경 실패! 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="login-box" onSubmit={handleSubmit}>
      <div style={{ width: '100%', marginBottom: '10px' }}>
        <PasswordField 
          placeholder="새 비밀번호 (숫자 4자리)" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
      </div>
      <div style={{ width: '100%', marginBottom: '20px' }}>
        <PasswordField 
          placeholder="새 비밀번호 확인" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "변경 중..." : "변경 완료"}
      </button>
    </form>
  );
}