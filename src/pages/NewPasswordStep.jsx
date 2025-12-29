import { useState } from 'react';
import PasswordField from '../components/PasswordField';
import { resetPasswordApi } from '../utils/axiosInstance'; 

export default function NewPasswordStep({ email, onFinish }) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // 1. 유효성 검사 로직 (실시간 체크용)
  const isPasswordInvalid = password.length > 0 && !/^(?=.*[a-zA-Z])(?=.*[!@#$%^&*+=-]).{8,}$/.test(password);
  const isConfirmInvalid = confirmPassword.length > 0 && password !== confirmPassword;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 빈 값 체크 및 유효성 최종 확인
    if (!password || isPasswordInvalid) {
      alert("비밀번호 형식을 다시 확인해주세요.");
      return;
    }

    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다!");
      return;
    }

    setIsLoading(true);
    try {
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

      {/* 새 비밀번호 입력 */}
      <div style={{ width: '100%', textAlign: 'left', marginBottom: '10px' }}>
        <PasswordField 
          placeholder="새 비밀번호 설정" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
        />
        {/* 2. 빨간색 경고 문구 추가 */}
        {isPasswordInvalid && (
          <div style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '-10px', marginBottom: '15px', paddingLeft: '5px', lineHeight: '1.4' }}>
            영문, 특수문자 숫자를 포함하여 8자 이상으로 설정해주세요!
          </div>
        )}
      </div>

      {/* 비밀번호 확인 입력 */}
      <div style={{ width: '100%', textAlign: 'left', marginBottom: '20px' }}>
        <PasswordField 
          placeholder="새 비밀번호 확인" 
          value={confirmPassword} 
          onChange={(e) => setConfirmPassword(e.target.value)} 
        />
        {/* 3. 일치하지 않을 때 경고 문구 추가 */}
        {isConfirmInvalid && (
          <div style={{ color: '#ff4d4d', fontSize: '12px', marginTop: '-10px', marginBottom: '15px', paddingLeft: '5px' }}>
            비밀번호가 일치하지 않아요!
          </div>
        )}
      </div>

      <button type="submit" disabled={isLoading || isPasswordInvalid || isConfirmInvalid}>
        {isLoading ? "변경 중..." : "변경 완료"}
      </button>
    </form>
  );
}