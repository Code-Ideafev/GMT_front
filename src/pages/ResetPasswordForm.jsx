import { useState, useEffect } from 'react';
import EmailStep from './EmailStep';
import VerifyStep from './VerifyStep';
import NewPasswordStep from './NewPasswordStep';
import './ResetPassword.css';
import { verifyEmailApi } from '../utils/axiosInstance'; 

export default function ResetPasswordForm({ onBack }) {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(180);

  useEffect(() => {
    if (step === 2 && timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && step === 2) {
      alert("인증 시간이 만료되었습니다.");
      setStep(1);
    }
  }, [step, timeLeft]);

  const formatTime = (s) => `${Math.floor(s/60)}:${(s%60).toString().padStart(2, '0')}`;

  const handleSendCodeSuccess = () => {
    setTimeLeft(180);
    setStep(2);
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      // ⭐ 수정 포인트: authCode를 서버가 원하는 'code'라는 이름으로 전달합니다.
      const response = await verifyEmailApi(email, authCode); 
      if (response.status === 200) {
        alert("인증 성공!");
        setStep(3);
      }
    } catch (error) {
      alert("인증번호가 틀렸거나 만료되었습니다.");
    }
  };

  return (
    <div id="resetPasswordContainer">
      <div className="welcome-text">비밀번호 재설정</div>

      {step === 1 && (
        <EmailStep 
          email={email} 
          setEmail={setEmail} 
          onNext={handleSendCodeSuccess} 
        />
      )}
      
      {step === 2 && (
        <VerifyStep 
          authCode={authCode} setAuthCode={setAuthCode} 
          timeLeft={timeLeft} formatTime={formatTime} 
          onNext={handleVerifyCode} 
          onResend={() => setTimeLeft(180)} 
        />
      )}
      
      {step === 3 && (
        <NewPasswordStep 
          email={email} 
          onFinish={() => { alert('비밀번호가 성공적으로 변경되었습니다!'); onBack(); }} 
        />
      )}
    </div>
  );
}